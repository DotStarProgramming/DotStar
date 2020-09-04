import React, {Component} from 'react';
import _ from "lodash";

import './Pagify.css';
import Page from '../Page';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import Utils from '../../dotstarlib/Utils';
import ResponsiveNav from '../ResponsiveNav';

export default class Pagify extends Component {
	constructor(props) {
		super(props);
		this.largeContainerRef = React.createRef();
		this.pageRefs = [];
		this.state = { 
			currentPage: 0,
			animLocked: false
		};
		this.lastTouch = null;
		this.lastFire = new Date();
		this.fireRate = 20;
	}

	handleOnTouchStart = (e) => {
		this.lastTouch = e.touches[0]
	}

	handleOnTouchMove = (e) => {
		var cFire = new Date();

		if (true){            
			let thisTouch = e.touches[0];

			let dx = thisTouch.pageX - this.lastTouch.pageX;
			let dy = thisTouch.pageY - this.lastTouch.pageY;

			this.lastTouch = thisTouch;

			let vertical = Math.abs(dx) < Math.abs(dy);

			if(vertical){
				let simEvent = {
					deltaY: -dy
				}
				this.handleParentWheel(simEvent);
			}
			this.lastFire = cFire;
		}
	}


	handleParentWheel = (e) => {
		let nextPage = this.state.currentPage;
		if(e.deltaY > 0){
			nextPage = this.state.currentPage + 1;
		}
		if(e.deltaY < 0){
			nextPage = this.state.currentPage - 1;
		}

		nextPage = Utils.clamp(nextPage, 0, this.props.children.length - 1);
		
		let notAnimating = this.largeContainerRef.current.getBoundingClientRect().y % window.innerHeight === 0;

		let elem = this.state.pageRefs[this.state.currentPage].current;
		let upBlocked = elem.scrollTop > 0;
		let downBlocked = elem.scrollTop + window.innerHeight < elem.scrollHeight;

		let cantUp = e.deltaY < 0 && upBlocked;
		let cantDown = e.deltaY > 0 && downBlocked;

		let shouldScroll = notAnimating && !cantUp && !cantDown && !this.animLocked;

		if(shouldScroll){
			this.setState({
				currentPage: nextPage,
			})
			this.animLocked = true;
		}
		else{
			if(notAnimating){
				this.animLocked = false;
			}
		}
	}

	static getDerivedStateFromProps(props, state){
		let refs = []
		for(let i = 0; i < props.children.length; i++){
			refs.push(React.createRef());
		}
		return {pageRefs: refs}
	}

	setPage = (newValue) => {
		let newPageRefs = this.state.pageRefs
		newPageRefs[newValue].current.scrollTop = 0

		this.setState({
			currentPage: newValue,
			pageRefs: newPageRefs
		})
	}

	render() {

		return (
			<>
			<BottomNavigation
				onChange={(event, newValue) => this.setPage(newValue)}
				component={ResponsiveNav}
				showLabels
			>
				{_.map(this.props.children, (child => (
					<BottomNavigationAction key = {child.props.label} label={child.props.label} icon={child.props.icon} />
				)))}
			</BottomNavigation>
			<div className = "page-container" onWheel={this.handleParentWheel} onTouchStart={this.handleOnTouchStart} onTouchMove={this.handleOnTouchMove}>
				<div ref={this.largeContainerRef} className="large-container" style = {{height: "calc(100vh * " + this.props.children.length + ")", top: "calc(100vh * -" + this.state.currentPage + ")"}}>
					{_.map(this.props.children, (child => {
						let keyIndex = this.props.children.indexOf(child);
						let childWithSetPage = React.cloneElement(child, {setPage: this.setPage, currentPage: this.state.currentPage});

						return <Page pageRef={this.state.pageRefs[keyIndex]} key={keyIndex} {...child.props}>
							{childWithSetPage}
							{child.props.nospacer ? "" : <div className="extra-scroll">&nbsp;</div>}
						</Page>
					}))}
				</div>
			</div>
			</>
		)
	}
}
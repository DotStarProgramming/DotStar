import React, { Component } from 'react';
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
			animLocked: false,
			width: window.innerWidth, 
			height: window.innerHeight
		};
		this.lastTouch = null;
		this.animLocked = false;
	}

	heightMonitor

	handleOnTouchStart = (e) => {
		this.lastTouch = e.touches[0]
	}

	//Basically just onWheel for mobile
	handleOnTouchMove = (e) => {
		let thisTouch = e.touches[0];

		let dx = thisTouch.pageX - this.lastTouch.pageX;
		let dy = thisTouch.pageY - this.lastTouch.pageY;

		this.lastTouch = thisTouch;

		let vertical = Math.abs(dx) < Math.abs(dy);

		if (vertical) {
			let simEvent = {
				deltaY: -dy
			}
			this.handleParentWheel(simEvent);
		}
	}

	//Logic for handling page turning
	handleParentWheel = (e) => {

		let scrollPadding = 2;

		//turn page in direction of scroll
		let nextPage = this.state.currentPage;
		if (e.deltaY > 0) {
			nextPage = this.state.currentPage + 1;
		}
		if (e.deltaY < 0) {
			nextPage = this.state.currentPage - 1;
		}

		//Clamp to not overscroll
		nextPage = Utils.clamp(nextPage, 0, this.props.children.length - 1);

		//Check if animation is done by checking if the top of the page is at the top of the screen
		let notAnimating = Math.round(this.largeContainerRef.current.getBoundingClientRect().y) % Math.round(this.state.height) === 0;

		//Is the element a scrolling element that's in the middle of scrolling itself?
		let elem = this.state.pageRefs[this.state.currentPage].current;
		let upBlocked = elem.scrollTop > scrollPadding;
		let downBlocked = elem.scrollTop + this.state.height + scrollPadding < elem.scrollHeight;

		let cantUp = e.deltaY < 0 && upBlocked;
		let cantDown = e.deltaY > 0 && downBlocked;

		console.log( elem.scrollTop, this.state.height, elem.scrollHeight);

		let shouldScroll = notAnimating && !cantUp && !cantDown && !this.animLocked;

		if (shouldScroll) {
			this.setState({
				currentPage: nextPage,
				lastPage: this.state.currentPage
			})
			//Safety for 2 event triggers in one frame
			this.animLocked = true;
			this.animLockTimer = new Date();
		}
		else {
			if (notAnimating) {
				if(this.animLocked){
					let animDelta = new Date() - this.animLockTimer;
					if(animDelta > 100){
						this.animLocked = false;
					}
				}
			}
		}
	}

	//One ref per child
	static getDerivedStateFromProps(props, state) {
		let refs = []
		for (let i = 0; i < props.children.length; i++) {
			refs.push(React.createRef());
		}
		return { pageRefs: refs }
	}

	//Manually set page, this gets passed down to children so that they can set the page too
	//Sets the scroll value to 0 when page is manually set
	setPage = (newValue) => {
		let newPageRefs = this.state.pageRefs
		newPageRefs[newValue].current.scrollTop = 0

		this.setState({
			currentPage: newValue,
			pageRefs: newPageRefs
		})
	}

	//Quick and easy resize listener
	updateDimensions = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	render() {
		return (
			<>
				{/* 
				Bottom navigation with an icon for every element in the pagify component
				*/}
				<BottomNavigation
					onChange={(event, newValue) => this.setPage(newValue)}
					component={ResponsiveNav}
					showLabels
				>
					{_.map(this.props.children, (child => (
						<BottomNavigationAction key={child.props.label} label={child.props.label} icon={child.props.icon} />
					)))}
				</BottomNavigation>

				{/* 
				Handlers for scroll on desktop and mobile
				Outer container just as big as screen
				*/}
				<div className="page-container" onWheel={this.handleParentWheel} onTouchStart={this.handleOnTouchStart} onTouchMove={this.handleOnTouchMove}>
					{/* 
					Inner container as big as all the pages
					*/}
					<div ref={this.largeContainerRef} className="large-container" style={{ hight: this.state.height*this.props.children.length, transform: `translateY(` + (-this.state.currentPage*this.state.height) + `px)`}}>
						{_.map(this.props.children, (child => {
							let keyIndex = this.props.children.indexOf(child);
							//Give every child their height, width, the current page, and a method to set the current page
							let childWithSetPage = React.cloneElement(child, { setPage: this.setPage, currentPage: this.state.currentPage, width: this.state.width, height: this.state.height });

							return <Page style={{width: this.state.width, height: this.state.height}} pageRef={this.state.pageRefs[keyIndex]} key={keyIndex} {...child.props}>
								{childWithSetPage}
								{/*Spacer because navbar can be up to 112px tall*/}
								{child.props.nospacer ? "" : <div className="extra-scroll">&nbsp;</div>}
							</Page>
						}))}
					</div>
				</div>
			</>
		)
	}
}
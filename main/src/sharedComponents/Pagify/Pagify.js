import React, {Component} from 'react';
import _ from "lodash";
import ReactPageScroller from "react-page-scroller";

import './Pagify.css';
import Page from '../Page';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

export default class Pagify extends Component {
	constructor(props) {
        super(props);
		this.state = { 
			currentPage: null,
			blockScrollUp: false,
			blockScrollDown: false 
		};
    }

    handlePageChange = number => {
		if(this.props.children[number].props.scrollable){
			this.setState({ 
				currentPage: number,
				blockScrollUp: true,
				blockScrollDown: true
			});
			return;
		}
		this.setState({ 
			currentPage: number,
			blockScrollUp: false,
			blockScrollDown: false
		});
	};
	
	handleScroll = (keyIndex, e) => {
		let scrollPad = 30;
		let atBottom = e.target.scrollTop + e.target.offsetHeight > e.target.scrollHeight - scrollPad;
		let atTop = e.target.scrollTop < scrollPad;
		let isCurrent = keyIndex === this.state.currentPage;
		
		if(isCurrent){
			this.setState({
				blockScrollUp: !atTop,
				blockScrollDown: !atBottom
			})
		}
	}

	render() {

		return (
			<>
			<BottomNavigation
				onChange={(event, newValue) => {
					this.setState({
						currentPage: newValue
					})
				}}
				className="bottom-navigation"
				showLabels
			>
				{_.map(this.props.children, (child => (
					<BottomNavigationAction key = {child.props.label} label={child.props.label} icon={child.props.icon} />
				)))}
			</BottomNavigation>
			<ReactPageScroller
				pageOnChange={this.handlePageChange}
				customPageNumber={this.state.currentPage}
				blockScrollUp={this.state.blockScrollUp}
				blockScrollDown = {this.state.blockScrollDown}
			>
				{_.map(this.props.children, (child => {
					let keyIndex = this.props.children.indexOf(child);
					return <Page key={keyIndex} absolute={child.props.absolute} onScroll={e => this.handleScroll(keyIndex, e)}>
						{child}
					</Page>
				}))}	
			</ReactPageScroller>
			</>
			
		)
	}
}
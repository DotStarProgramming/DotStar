import React, {Component} from 'react';
import _ from "lodash";
import ReactPageScroller from "react-page-scroller";

import './Pagify.css';
import Page from '../Page';

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
			
		)
	}
}
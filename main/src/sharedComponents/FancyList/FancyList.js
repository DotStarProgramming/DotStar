import React, { Component } from 'react';

import './FancyList.css';
import { Grid } from "@material-ui/core";
import CircleImage from '../../smallComponents/CircleImage';

class FancyList extends Component {

	render() {
		return <div className={this.props.className}>
			{this.props.children}
		</div>
	}
}

class Item extends Component {
	render() {
		let content = [
			<Grid item key={"Image"} xs={this.props.responsive ? 12 : 2} md={2}>
				<CircleImage src={this.props.src} />
			</Grid>,
			<Grid item key={"Body"} xs={this.props.responsive ? 12 : 10} md={10} className="fancy-list-item-content left">
				<h3>{this.props.title}</h3>
				<p>{this.props.children}</p>
			</Grid>
		]

		if (this.props.reverse) {
			content.reverse();
		}
		return (
			<div className={"fancy-list-item-container"}>
				<div className="fancy-list-item">
					<Grid container spacing={3}>
						{content}
					</Grid>
				</div>
			</div>
		)
	}
}

FancyList.Item = Item;

export default FancyList;
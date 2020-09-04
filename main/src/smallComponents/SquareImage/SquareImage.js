import React, {Component} from 'react';

import './SquareImage.css';

export default class SquareImage extends Component {
	render() {
		let width = this.props.width || 100;
		let margin = (100-width)/2;

		let style = {
			marginLeft: margin + "%",
			marginRight: margin + "%",
    		width: width + "%"
		}
		return (
			<div className="equal-aspect-container" style = {style}>
				<img className="square" src={this.props.src} alt={this.props.alt}/>
			</div>
		)
	}
}
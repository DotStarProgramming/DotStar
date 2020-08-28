import React, {Component} from 'react';

import './CircleImage.css';

export default class CircleImage extends Component {
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
				<img className="circle" src={this.props.src} alt={this.props.alt}/>
			</div>
		)
	}
}
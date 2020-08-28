import React, {Component} from 'react';

import './Page.css';

export default class Page extends Component {
	render() {
		let pageStyle = {
			backgroundColor: this.props.backgroundColor || "auto",
			backgroundSize: "cover",
			background: this.props.src ? "url(" + this.props.src + ")" : "auto"
		}

		return (
			<div onScroll={this.props.onScroll} onWheel={this.props.onWheel} className={this.props.absolute ? "page-absolute" : "page"} style={pageStyle}>
				<div className="spacer-top"></div>
				{this.props.children}
				<div className="spacer-bottom"></div>
			</div>
		)
	}
}
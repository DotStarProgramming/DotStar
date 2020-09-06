import React, {Component} from 'react';

import './Page.css';

export default class Page extends Component {
	render() {

		let {pageRef, nospacer, nospacerbottom, nospacertop, children, ...extraProps} = this.props

		return (
			<div ref={pageRef} className={"page"} {...extraProps}>
				{(nospacertop || nospacer) ? "" : <div className="spacer-top"></div>}
				{children}
				{(nospacerbottom || nospacer) ? "" : <div className="spacer-bottom"></div>}
			</div>
		)
	}
}
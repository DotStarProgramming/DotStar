import React, {Component} from 'react';

import './Page.css';

export default class Page extends Component {
	render() {

		let {absolute, pageRef, nomargin, nospacer, children, ...extraProps} = this.props

		return (
			<div ref={pageRef} className={"page " + (absolute ? "page-absolute" : "page-relative") + (nomargin ? " no-margin" : "")} {...extraProps}>
				{nospacer ? "" : <div className="spacer-top"></div>}
				{children}
				{nospacer ? "" : <div className="spacer-bottom"></div>}
			</div>
		)
	}
}
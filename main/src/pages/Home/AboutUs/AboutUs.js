import React, { Component } from 'react';

import './AboutUs.css';
import Brand from '../../../smallComponents/Brand';

export default class AboutUs extends Component {
	render() {
		return (
			<>
				<h3 className="display-3">About <Brand /></h3>
				<p><Brand /> provides solutions for everything programming. From automation, to web design, to mobile and desktop applications.</p>
				<p>We employ only the absolute best of the best, blazing fast developers to get projects done extremely quickly, without sacrificing quality.</p>
			</>
		)
	}
}
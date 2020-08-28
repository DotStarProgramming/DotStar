import React, {Component} from 'react';

import './OurPhilosophy.css';

export default class OurPhilosophy extends Component {
	render() {
		return (
			<div className="normal-p">
				<h3 className="display-3">Our Philosophy</h3>
				<p>All software engineers are not equal. Like most jobs, some software engineers will be faster, produce higher quality code, and create a more robust end product. 
					However, unlike other fields, where a good professional will be at most 40-50% more productive than an average one, a good software engineer can be up to <a target="_blank" rel="noopener noreferrer" href="https://www.construx.com/blog/the-origins-of-10x-how-valid-is-the-underlying-research/">25x more productive</a> than an average one</p>
				<p>We charge more per hour, but you end up paying less per project</p>
			</div>
		)
	}
}
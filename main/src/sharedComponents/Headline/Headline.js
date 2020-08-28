import React, {Component} from 'react';

import './Headline.css';

export default class Headline extends Component {
	render() {
		return (
            <div className = "headline">
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                />
                <div>
                    <h3 className={this.props.invert ? "invert" : ""}>{this.props.title}</h3>
                    <p className={this.props.invert ? "invert" : ""}>{this.props.body}</p>
                </div>
            </div>
		)
	}
}
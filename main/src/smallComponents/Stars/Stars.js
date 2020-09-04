import React, {Component} from 'react';

import './Stars.css';
export default class Stars extends Component {
	render() {

		let string = "";
		let antistring = "";

		for(let i = 0; i < this.props.num; i++){
			string += "●"
		}

		for(let i = 0; i < (5-this.props.num); i++){
			antistring += "●"
		}
		return (
			<><span className="stars">{string}</span><span className="antistars">{antistring}</span></>
		)
	}
}
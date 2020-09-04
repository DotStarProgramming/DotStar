import React, {Component} from 'react';
import _ from "lodash";

import './ResponsiveNav.css';
import { Grid } from '@material-ui/core';

export default class ResponsiveNav extends Component {
	render() {
		return (
			<div className="bottom-navigation">
				<Grid container spacing={0} className="justify-center">
					{_.map(this.props.children, (child) => (
						<Grid key={child.key} item xs={3} sm={1}>
							{child}
						</Grid>
					))}
				</Grid>
			</div>
		)
	}
}
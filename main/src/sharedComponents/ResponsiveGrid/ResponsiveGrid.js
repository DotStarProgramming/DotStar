import React, {Component} from 'react';

import './ResponsiveGrid.css';
import {Grid} from "@material-ui/core";
import _ from "lodash";
import {PoseGroup} from "react-pose";

export default class ResponsiveGrid extends Component {
	render() {
		return (
			
			<Grid className="justify-center" container spacing={2}>
				<PoseGroup>
					{_.map(this.props.children, (child) => (
						<Grid item key={child.key} {...this.props}>{child}</Grid>
					))}
				</PoseGroup>
			</Grid>
		)
	}
}	
import React, {Component} from 'react';

import './ResponsiveGrid.css';
import {Grid} from "@material-ui/core";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

export default class ResponsiveGrid extends Component {
	render() {
		return (
			<Grid className="justify-center" container spacing={3}>
				{_.map(this.props.children, (child) => (
					<Grid item key={uuidv4()} xs={6} lg={4}>{child}</Grid>
				))}
			</Grid>
		)
	}
}
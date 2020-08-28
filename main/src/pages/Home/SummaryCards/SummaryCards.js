import React, { Component } from 'react';

import { Button } from "@material-ui/core";
import './SummaryCards.css';
import Brand from '../../../smallComponents/Brand';
import CircleImage from '../../../smallComponents/CircleImage';
import ResponsiveGrid from '../../../sharedComponents/ResponsiveGrid';

export default class SummaryCards extends Component {
	render() {
		return (
			<>
				<ResponsiveGrid>
					<div>
						<CircleImage width={60} src={"/images/automation.png"}></CircleImage>

						<div>
							<h3>Automation</h3>
							<p>
								Massively increase productivity by modifying workflows to include automation. From document scanning, to identifying patterns and tagging data.
                            </p>
						</div>
						<Button className="underline" href="/automation">
							Learn More
                        </Button>
					</div>
					<div>
						<CircleImage width={60} src={"/images/website.png"}></CircleImage>

						<div>
							<h3>Websites</h3>
							<p>
								Whether you want to boost your presence online with a beautiful website, or you want to increase productivity and collaboration with a company intranet.
                            </p>
						</div>
						<Button className="underline" href="/websites">
							Learn More
                        </Button>
					</div>
					<div>
						<CircleImage width={60} src={"/images/desktopmobile.png"}></CircleImage>

						<div>
							<h3>Desktop and Mobile Applications</h3>
							<p>
								From game development, to data analysis, <Brand /> can deliver you native applications for iOS, Android, Windows, MacOS, and Linux.
                            </p>
						</div>
						<Button className="underline" href="/apps">
							Learn More
                        </Button>
					</div>
				</ResponsiveGrid>
			</>
		)
	}
}
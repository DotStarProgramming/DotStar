import React, {Component} from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';

import './WhatNow.css';
import { Button, Typography } from "@material-ui/core";
import {Settings} from "@material-ui/icons";
import { Brand } from '../../../smallComponents';
import Page from '../../../sharedComponents/Page';

export default class WhatNow extends Component {
	render() {
		return (
			<>
				<Typography variant="h3" className="header">What Now?</Typography>
				<VerticalTimeline>
				<VerticalTimelineElement
					iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					icon={<Settings />}
				>
					<h3 className="vertical-timeline-element-title">Request a Free Consultation</h3>
					<p>
					<Brand /> Provides a free 1 hour consultation free of charge where a skilled solutions engineer will listen and go through every aspect of your planned project. <br></br><br></br>They will give you an idea of what <Brand /> can provide and offer insight into what kinds of solutions would be beneficial
					</p>
				</VerticalTimelineElement>
				<VerticalTimelineElement
					iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					icon={<Settings />}
				>
					<h3 className="vertical-timeline-element-title">Get a Quote</h3>
					<p>
					After your consultation, <Brand /> will provide you with either one, or a few quotes depending on the range of possible work.
					</p>
				</VerticalTimelineElement>
				<VerticalTimelineElement
					iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					icon={<Settings />}
				>
					<h3 className="vertical-timeline-element-title">Sign your contract</h3>
					<p>
					After you receive your quote, you’ll receive a contract with both the agreed upon price, as well as the itemized list of work to be completed.
					</p>
				</VerticalTimelineElement>
				<VerticalTimelineElement
					iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					icon={<Settings />}
				>
					<h3 className="vertical-timeline-element-title">Receive updates</h3>
					<p>
					Over the lifetime of your project, you will receive consistent progress updates via either e-mail, or a shared Trello board
					</p>
				</VerticalTimelineElement>
				<VerticalTimelineElement
					iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
					icon={<Settings />}
				>
					<h3 className="vertical-timeline-element-title">It’s Done!</h3>
					<p>
					After <Brand /> has completed your project you will receive all code/assets/builds that were created during the lifetime of your project.
					</p>
				</VerticalTimelineElement>
				
				</VerticalTimeline>
				<Button href="/quote">
					Request a Free Consultation
				</Button>
			</>
		)
	}
}
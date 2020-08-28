import React, {Component} from 'react';

import './WhyDotStar.css';
import { Brand } from '../../../smallComponents';
import { FancyList } from "../../../sharedComponents";
import { Typography, Container } from '@material-ui/core';

export default class WhyDotStar extends Component {
	render() {
		return (
			<Container>
                <Typography variant="h3" className="header">The <Brand /> Difference</Typography>
                <FancyList className="left">
                    <FancyList.Item src={"/images/canada.jpg"} title="100% Canadian">
                    	<Brand /> is based 100% in Canada, and uses absolutely no outsourcing. You can be confident that your project will be made in, and stay in Canada
                    </FancyList.Item>
                    <FancyList.Item src={"/images/shake-hands.jpg"} title="Fully Transparent">
                        From start to finish, <Brand /> will log every work item, bug, and task in a shared Trello board. You can see in real time what's being worked on, and how far along your project is
                    </FancyList.Item>
                    <FancyList.Item src={"/images/circuit.jpg"} title="Pay less, get your project faster">
                        With <Brand />, you can be sure that a rockstar developer is working on your project, no matter how small. Which means not only will your project be <a href="https://www.construx.com/blog/the-origins-of-10x-how-valid-is-the-underlying-research/">done faster</a>, but you'll end up paying less despite the higher hourly cost
                    </FancyList.Item>
                </FancyList>
            </Container>
		)
	}
}
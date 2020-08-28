import React, {Component} from 'react';

import './WhyDotStar.css';
import { Brand } from '../../../smallComponents';
import { FancyList } from "../../../sharedComponents";

export default class WhyDotStar extends Component {
	render() {
		return (
			<>
				<h3 className="display-3">Why <Brand />?</h3>
                <FancyList className="left">
                    <FancyList.Item src={"/images/canada.jpg"} title="100% Canadian">
                    	<Brand /> is based 100% in Canada [[[]]]
                    </FancyList.Item>
                    <FancyList.Item src={"/images/shake-hands.jpg"} title="Fully Transparent">
                        From start to finish, <Brand /> will [[[]]]. You can even check out the entire <a href="https://github.com/DotStarProgramming/DotStar">source code of this site</a>
                    </FancyList.Item>
                    <FancyList.Item src={"/images/circuit.jpg"} title="Thorough Expertise">
                        <Brand /> understands the importance of fully grasping every single part of
                    </FancyList.Item>
                </FancyList>
			</>
		)
	}
}
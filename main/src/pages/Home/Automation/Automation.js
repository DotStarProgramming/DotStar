import React, { Component } from 'react'
import { FancyList } from '../../../sharedComponents'
import { Brand } from "../../../smallComponents"
import { Container, Typography } from "@material-ui/core"

export default class Automation extends Component {
    render() {
        
        return (
            <Container>
                <Typography variant="h3" className="header">Automation</Typography>

                <FancyList className="left">
                    <FancyList.Item src={"/images/data-entry.jpg"} title="Data Entry">
                        Turn hours of human labour into a one second button press.
                    </FancyList.Item>
                    <FancyList.Item src={"/images/report-generation.jpg"} title="Report generation">
                        Collect data from numerous systems and interfaces, and export it to dozens of possible formats.
                    </FancyList.Item>
                    <FancyList.Item src={"/images/pattern-matching.jpg"} title="Pattern Matching">
                        Using recent advances in Artificial Intelligence, <Brand /> can generate solutions to replace even complex tasks, such as picking out important data from audio, or drawing conclusions from massive data sets.
                    </FancyList.Item>
                </FancyList>
            </Container>
        )
    }
}

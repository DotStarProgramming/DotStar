import React, { Component } from 'react'
import { FancyList, Headline } from "../../sharedComponents"
import { Brand } from '../../smallComponents'
import { Container, Typography } from "@material-ui/core"
import Page from '../../sharedComponents/Page'

export default class Automation extends Component {
    render() {
        
        return (
            <Container>
                <Typography variant="h3" className="header">Automation</Typography>

                <FancyList className="left">
                    <FancyList.Item src={"/images/data-entry.jpg"} title="Data Entry">
                        From picking out data from a paper report and inserting it into a spreadsheet, to inserting records from your database into an online form. Turn hours of human labour into a one second button press.
                    </FancyList.Item>
                    <FancyList.Item src={"/images/report-generation.jpg"} title="Report generation">
                        Turning raw data into nicely formatted reports is often a very repetitive task, which can easily be automated start to finish. From collection data from numerous systems and interfaces, to exporting a report in any of dozens of reporting formats.
                    </FancyList.Item>
                    <FancyList.Item src={"/images/pattern-matching.jpg"} title="Pattern Matching">
                        Using recent advances in Artificial Intelligence, <Brand /> can generate solutions to replace even complex tasks, such as picking out important data from audio, or drawing conclusions from massive data sets.
                    </FancyList.Item>
                </FancyList>
            </Container>
        )
    }
}

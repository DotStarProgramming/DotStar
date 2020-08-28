import React, { Component } from 'react'
import _ from "lodash";
import { CircleImage, Brand } from '../../../smallComponents';
import { ResponsiveGrid, Headline } from "../../../sharedComponents";
import { Container, Typography } from "@material-ui/core";

export default class Apps extends Component {
    render() {

        let platforms = [{
            title:"Windows",
            image:"/images/windows.png"
        },
        {
            title:"Mac",
            image:"/images/mac.png"
        },
        {
            title:"Linux",
            image:"/images/linux.png"
        },
        {
            title:"Android",
            image:"/images/android.png"
        },
        {
            title:"iOS",
            image:"/images/ios.png"
        },
        ]

        return (
            <div>
                <Container>
                <Typography variant="h3" className="header">Cross-platform Development</Typography>
                    <p>Dot Star can create your project for any, or all of the following platforms</p>
                    
                    <ResponsiveGrid>
                        {_.map(platforms, (platform) => (
                            <div key={platform.title}>
                                <CircleImage width={60} src={platform.image}></CircleImage>
                                <div>{platform.title}</div>
                            </div>
                        ))}
                    </ResponsiveGrid>
                </Container>
            </div>
        )
    }
}

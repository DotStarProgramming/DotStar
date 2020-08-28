import React, { Component } from 'react'
import _ from "lodash";
import { CircleImage, Brand } from '../../smallComponents';
import { ResponsiveGrid, Headline } from "../../sharedComponents";
import { Container } from "@material-ui/core";

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
            ""
            // <div>
            //     <Headline src={"/images/desktop-mobile-header.jpg"}/>
            //     <Container>
            //         <h3 className="display-3">Software For Every Device</h3>
            //         <p>Using modern cross-platform technologies, <Brand /> can write software that can be natively installed and used on everything from a smart watch, to a cellphone.</p>
            //         <hr></hr>
                    
            //         <ResponsiveGrid>
            //             {_.map(platforms, (platform) => (
            //                 <>
            //                     <CircleImage key={platform.title + "img"} width={60} src={platform.image}></CircleImage>
            //                     <div key={platform.title + "div"}>{platform.title}</div>
            //                 </>
            //             ))}
            //         </ResponsiveGrid>
            //     </Container>
            // </div>
        )
    }
}

import React, { Component } from 'react'
import "./Home.css"
import MainText from './MainText/MainText';
import WhatNow from './WhatNow/WhatNow';
import Automation from './Automation';
import Apps from "./Apps"


import { Settings, Web, Devices, PlaylistPlay, Forward, Info, Person} from "@material-ui/icons";
import { Home as HomeIcon} from "@material-ui/icons";
import Pagify from '../../sharedComponents/Pagify/Pagify';
import WhyDotStar from './WhyDotStar/WhyDotStar';
import Consult from './Consult';

export default class Home extends Component {
    

    render() {
        return (
            <>
                <Pagify>
                    <MainText absolute icon={<HomeIcon />} label="Home" seen={this.props.seen} />
                    <Automation icon={<Settings />} label="Automation"/>
                    <Apps icon={<Devices />} label="Mobile/Desktop"/>
                    <WhyDotStar icon={<Info />} label="About" />
                    <WhatNow scrollable icon={<Forward />} label="What Now"/>
                    <Consult icon={<Person />} label="Free Consultation" />
                </Pagify>
            </>
        )
    }
}

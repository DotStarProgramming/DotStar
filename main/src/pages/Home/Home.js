import React, { Component } from 'react'
import "./Home.css"
import MainText from './MainText/MainText';
import WhatNow from './WhatNow/WhatNow';
import Automation from './Automation';
import Apps from "./Apps"
import AboutUs from "./AboutUs"

import { Settings, Web, Devices, Forward, Info, Person} from "@material-ui/icons";
import { Home as HomeIcon} from "@material-ui/icons";
import Pagify from '../../sharedComponents/Pagify/Pagify';
import WhyDotStar from './WhyDotStar/WhyDotStar';
import Consult from './Consult';
import Websites from './Websites';

export default class Home extends Component {
    

    render() {

        

        return (
            <>
                <Pagify>
                    <MainText absolute icon={<HomeIcon />} label="Home" seen={this.props.seen} />
                    <WhyDotStar icon={<Info />} label="About" />
                    <AboutUs icon={<Info />} label="About" />
                    <Apps icon={<Devices />} label="Platforms"/>
                    <WhatNow icon={<Forward />} label="What Now"/>
                    <Consult icon={<Person />} label="Free Consultation" />
                </Pagify>
            </>
        )
    }
}

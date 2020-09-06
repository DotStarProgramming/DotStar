import React, { Component } from 'react'
import "./Home.css"
import MainText from './MainText';
import WhatNow from './WhatNow';
import Apps from "./Apps"
import Technologies from "./Technologies"

import { Devices, Forward, Info, Person, Code} from "@material-ui/icons";
import { Home as HomeIcon} from "@material-ui/icons";
import Pagify from '../../sharedComponents/Pagify/Pagify';
import WhyDotStar from './WhyDotStar/WhyDotStar';
import Consult from './Consult';

export default class Home extends Component {
    

    render() {

        

        return (
            <>
                <Pagify>
                    <MainText icon={<HomeIcon />} label="Home" seen={this.props.seen} />
                    <WhyDotStar nospacertop icon={<Info />} label="About" />
                    <Technologies icon={<Code />} label="Technologies" />
                    <Apps icon={<Devices />} label="Platforms"/>
                    <WhatNow icon={<Forward />} label="What Now"/>
                    <Consult icon={<Person />} label="Free Consultation" />
                </Pagify>
            </>
        )
    }
}

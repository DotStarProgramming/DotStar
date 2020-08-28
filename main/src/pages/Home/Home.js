import React, { Component } from 'react'
import "./Home.css"
import MainText from './MainText/MainText';
import WhatNow from './WhatNow/WhatNow';
import Automation from '../Automation';


import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Settings, Web, Devices, PlaylistPlay } from "@material-ui/icons";
import Pagify from '../../sharedComponents/Pagify/Pagify';

export default class Home extends Component {
    

    render() {
        return (
            <>
                <BottomNavigation
                    onChange={(event, newValue) => {
                        console.log("test");
                    }}
                    className="bottom-navigation"
                    showLabels
                >
                    <BottomNavigationAction label="Automation" icon={<Settings />} />
                    <BottomNavigationAction label="Favorites" icon={<Web />} />
                    <BottomNavigationAction label="Desktop/Mobile" icon={<Devices />} />
                    <BottomNavigationAction label="Examples" icon={<PlaylistPlay />} />
                </BottomNavigation>
                <Pagify>
                    <MainText absolute seen={this.props.seen} />
                    <Automation backgroundColor="var(--list-highlight)" />
                    <WhatNow />
                </Pagify>
            </>
        )
    }
}

import React, { Component } from 'react';

import './WhyDotStar.css';
import { Brand } from '../../../smallComponents';
import { FancyList } from "../../../sharedComponents";
import { Typography, Container, Link, Box, Paper, withStyles} from '@material-ui/core';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import Automation from '../Automation';

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        padding: '1em',
        marginBottom: "1em",
        textAlign: "center",
        backgroundColor: "#FFFFFFE0"
    },
    carousel:{
        minHeight: "calc(100% - 112px)"
    },
    carouselItem: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    carouselItem1: {
        background: "url(images/trello.png)",
        backgroundSize: "cover",
        backgroundPosition: "top left",
    },
    carouselItem2: {
        background: "url(images/automation.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
    },
    carouselItem3: {
        background: "url(images/online.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
    },
    flex: {
        flex: 1
    }
});

export default withStyles(styles, { withTheme: true })(class WhyDotStar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <AwesomeSlider className={classes.carousel}>
                <div className={`${classes.carouselItem}  ${classes.carouselItem2}`}>
                    <Box className={classes.flex}></Box>
                    <Container maxWidth="md">
                        <Paper elevation={5} className={classes.paper}>
                            <Typography variant="h3" className="header">Automate everything</Typography>
                            <Typography variant="h6">Never bring a human to do a robot's job. From report generation, to pattern matching with artificial intelligence. <Brand /> has a solution for you</Typography>
                        </Paper>
                    </Container>
                </div>
                <div className={`${classes.carouselItem}  ${classes.carouselItem3}`}>
                    <Box className={classes.flex}></Box>
                    <Container maxWidth="md">
                        <Paper elevation={5} className={classes.paper}>
                            <Typography variant="h3" className="header">Bring your idea online</Typography>
                            <Typography variant="h6"><Brand />'s ultra modern and sleek web design can bring your ideas online. Anything from a simple portfolio site, to a complex data-processing portal, to <Link href="horses">simply thousands of horses</Link> </Typography>
                        </Paper>
                    </Container>
                </div>
                <div className={`${classes.carouselItem}  ${classes.carouselItem1}`}>
                    <Box className={classes.flex}></Box>
                    <Container maxWidth="md">
                        <Paper elevation={5} className={classes.paper}>
                            <Typography variant="h3" className="header">Track your project every step of the way</Typography>
                            <Typography variant="h6">At the start of development. You'll be given a Trello link through with you can see exactly where each part of your project is</Typography>
                        </Paper>
                    </Container>
                </div>
            </AwesomeSlider>
        )
    }
})
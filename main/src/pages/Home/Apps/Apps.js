import React, { Component } from 'react'
import _ from "lodash";
import { CircleImage, Brand } from '../../../smallComponents';
import { ResponsiveGrid } from "../../../sharedComponents";
import { Container, Typography, withStyles, Paper } from "@material-ui/core";
import { CallMissedSharp } from '@material-ui/icons';

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '3em',
        padding: '1em'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

export default withStyles(styles, { withTheme: true })(class Apps extends Component {
    render() {

        let platforms = [{
            title: "Windows",
            image: "/images/windows.png"
        },
        {
            title: "Mac",
            image: "/images/mac.png"
        },
        {
            title: "Linux",
            image: "/images/linux.png"
        },
        {
            title: "Android",
            image: "/images/android.png"
        },
        {
            title: "iOS",
            image: "/images/ios.png"
        },
        ]

        const {classes} = this.props;

        return (
            <Container>
                <Paper elevation={4} className={classes.paper}>
                    <Typography variant="h3" className="header">Cross-platform Development</Typography>
                    <Typography variant="h6">Whether you have a mobile app idea, or just want a quick way for your employees to submit field reports</Typography>
                </Paper>
                <ResponsiveGrid>
                    {_.map(platforms, (platform) => (
                        <div key={platform.title}>
                            <CircleImage width={60} src={platform.image}></CircleImage>
                            <div>{platform.title}</div>
                        </div>
                    ))}
                </ResponsiveGrid>
            </Container>
        )
    }
});

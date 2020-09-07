import React, { Component } from 'react'
import _ from "lodash";
import { CircleImage, Brand } from '../../../smallComponents';
import { ResponsiveGrid } from "../../../sharedComponents";
import { Container, Typography, withStyles, Paper } from "@material-ui/core";

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
                    <Typography variant="h6"><Brand /> can create for any, or all, of the following platforms</Typography>
                </Paper>
                <ResponsiveGrid xs={6} lg={4}>
                    {_.map(platforms, (platform) => (
                        <div key={platform.title}>
                            <CircleImage width={60} src={platform.image}></CircleImage>
                            <Typography variant="subtitle1">{platform.title}</Typography>
                        </div>
                    ))}
                </ResponsiveGrid>
            </Container>
        )
    }
});

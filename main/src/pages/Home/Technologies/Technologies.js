import React, { Component } from 'react'
import _ from "lodash";
import "./Technologies.css"
import { SquareImage, Brand, CircleImage, Stars } from '../../../smallComponents';
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
    label:{
        width: "65%",
        paddingLeft: "17.5%"
    },
    left:{
        float: "left",
        fontSize: "min(1rem, 3vw)"
    },
    stars:{
        float: "right",
        fontSize: "min(1rem, 3vw)"
    }
});

const TechLabel = withStyles(styles, { withTheme: true })(class TechLabel extends Component {
    render(){
        const {classes} = this.props;

        return <div className={classes.label}><Typography variant="subtitle1" className={classes.left}>{this.props.title}</Typography><span className={classes.stars}><Stars num={this.props.proficiency}/></span></div>
    }
})

export default withStyles(styles, { withTheme: true })(class Technologies extends Component {
    render() {

        let technologies = [
        {
            title: "JavaScript",
            icon: "/images/icons/javascript/javascript-original.svg",
            proficiency: 5,
            tags: ["JS", "ECMA", "ES6"]
        },
        {
            title: "CSS",
            icon: "/images/icons/css3/css3-original.svg",
            proficiency: 5,
            tags: ["css3"]
        },
        {
            title: "React",
            icon: "/images/icons/react/react-original.svg",
            proficiency: 5,
            tags: ["redux"]
        },
        {
            title: "Express",
            icon: "/images/icons/express/express-original.svg",
            proficiency: 5,
            tags: []
        },
        {
            title: "NodeJS",
            icon: "/images/icons/nodejs/nodejs-original.svg",
            proficiency: 5,
            tags: []
        },
        {
            title: "Electron",
            icon: "/images/icons/electron/electron-original.svg",
            proficiency: 5,
            tags: []
        },
        {
            title: "Bootstrap",
            icon: "/images/icons/bootstrap/bootstrap-plain.svg",
            proficiency: 5,
            tags: []
        },
        {
            title: "Three",
            icon: "/images/icons/three.jpg",
            proficiency: 5,
            tags: ["3D"],
            circle: true
        },
        {
            title: "AWS",
            icon: "/images/icons/amazonwebservices/amazonwebservices-original.svg",
            proficiency: 4,
            tags: ["S3", "EC2"]
        },
        {
            title: "MongoDB",
            icon: "/images/icons/mongodb/mongodb-original.svg",
            proficiency: 5,
            tags: []
        },
        {
            title: "Python",
            icon: "/images/icons/python/python-original.svg",
            proficiency: 5,
            tags: ["py", "python3", "pandas", "keras"]
        },
        {
            title: "Java",
            icon: "/images/icons/java/java-original.svg",
            proficiency: 5,
            tags: ["jre"]
        },
        {
            title: "Tomcat",
            icon: "/images/icons/tomcat/tomcat-original.svg",
            proficiency: 5,
            tags: ["apache", "catalina"]
        },
        {
            title: "Apache",
            icon: "/images/icons/apache/apache-original.svg",
            proficiency: 3,
            tags: []
        },
        {
            title: "MySQL",
            icon: "/images/icons/mysql/mysql-original.svg",
            proficiency: 4,
            tags: []
        },
        {
            title: "PHP",
            icon: "/images/icons/php/php-original.svg",
            proficiency: 3,
            tags: []
        },
        {
            title: "C++",
            icon: "/images/icons/cplusplus/cplusplus-original.svg",
            proficiency: 4,
            tags: []
        },
        {
            title: "C#",
            icon: "/images/icons/csharp/csharp-original.svg",
            proficiency: 3,
            tags: [".NET"]
        }
        ]

        const {classes} = this.props;

        return (
            <Container>
                <Paper elevation={4} className={classes.paper}>
                    <Typography variant="h3" className="header">Technologies</Typography>
                    <Typography variant="h6">What can <Brand /> work with?</Typography>
                </Paper>
                <ResponsiveGrid xs={6} md={4} lg={3} xl={2}>
                    {_.map(technologies, (technology) => (
                        <div key={technology.title}>
                            {technology.circle ? <CircleImage width={60} src={technology.icon}></CircleImage> : <SquareImage width={60} src={technology.icon}></SquareImage>}
                            <TechLabel {...technology}></TechLabel>
                        </div>
                    ))}
                </ResponsiveGrid>
            </Container>
        )
    }
});

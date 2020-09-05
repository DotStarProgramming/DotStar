import React, { Component } from 'react'

import "./Consult.css"
import { Container, Typography, TextField, Grid, Button, withStyles, Paper, Fade } from '@material-ui/core'
import { OfficeEmail } from "../../../smallComponents/Brand"

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "2em"
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

export default withStyles(styles, { withTheme: true })(class Consult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitState: "waiting"
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach((value, key) => {object[key] = value});
        this.setState({
            submitState: "submitting"
        })

        let _this = this;

        fetch(`${window.location.protocol}//${window.location.hostname}:80/api/request-consult`, {
            method: 'POST',
            body: JSON.stringify(object),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message)
                _this.setState({
                    submitState: "done"
                })
            }
            else {
                console.log("not success!")
            }
        })
    }

    render() {
        const { classes } = this.props;

        let form = <Paper className={classes.paper}>
            <Typography variant="h3" className="header">Request a Free 1 Hour Consultation</Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Personal or Corporate Name"
                            name="name"
                            autoComplete="name+"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            variant="outlined"
                            required
                            fullWidth
                            name="description"
                            label="Describe your project"
                            type="description"
                            id="description"
                            autoComplete="description"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Send
            </Button>
            </form>
        </Paper>

        let done = <Paper className={classes.paper}>
            <Typography variant="h3" className="header">Your request has been submitted</Typography>
            <Typography variant="h6" className="header">You should recieve a confirmation email, if you haven't recieved one, please check your spam folder for mail from <OfficeEmail /></Typography>
        </Paper>

        return (
            <Container maxWidth="xs">
                <Fade in={this.state.submitState === "waiting" || this.state.submitState === "done"} timeout={1000}>
                    {this.state.submitState === "done" ? done : form}
                </Fade>

            </Container>
        )
    }
})
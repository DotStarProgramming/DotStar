import React, { Component } from 'react'

import "./Consult.css"
import { Container, Typography, TextField, Grid, Box, FormControl, InputLabel, Input, InputAdornment, makeStyles, CssBaseline, Avatar, FormControlLabel, Checkbox, Button, Link, withStyles } from '@material-ui/core'
import { Email, AccountCircle } from '@material-ui/icons'

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="xs">
                <div className={classes.paper}>
                    <Typography variant="h3" className="header">Request a Free 1 Hour Consultation</Typography>
                    <form className={classes.form} noValidate>
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
                                    label="Describe your required services or project idea"
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
                </div>
            </Container>
        )
    }
})
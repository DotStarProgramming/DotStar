import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import './App.css';

import { ThemeProvider } from "@material-ui/core";
import { Home, Horses } from "./pages";

function App() {

	let theme = createMuiTheme({
		palette: {
			primary: {
				dark: "#1976D2",
				main: "#2196F3",
				light: "#BBDEFB"
			}
		},
	});
	theme = responsiveFontSizes(theme);
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route path="/lesshorse">
						<Horses width={32}/>
					</Route>
					<Route path="/horse">
						<Horses />
					</Route>
					<Route path="/morse">
						<Horses width={128}/>
					</Route>
					<Route path="/moremorse">
						<Horses width={256}/>
					</Route>
					<Route path="/home">
						<Home seen={true} />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;

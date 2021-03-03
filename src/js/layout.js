import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navigation } from "./component/navbar";
import { Footer } from "./component/footer";
import { Profile } from "./views/Profile";
import { Register } from "./views/register";

//create your first component
const Layout = props => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navigation />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/profile/:entity/:id">
							<Profile />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

Layout.propTypes = {
	store: PropTypes.object
};

export default injectContext(Layout);

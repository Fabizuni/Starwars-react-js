import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Context } from "../store/appContext";

export const Navigation = () => {
	const onRemoveFavorite = useCallback((action, favorite) => () => {
		const entity = favorite.entity ? "person" : "planet";
		action(entity, favorite.id);
	});
	return (
		<Context.Consumer>
			{value => {
				const { store, actions } = value;
				const currentFavorites = store.favorites.map(favorite => {
					if (favorite.entity === "person") {
						return store.character.find(person => person.id === favorite.id);
					} else {
						return store.planets.find(planet => planet.id === favorite.id);
					}
				});
				return (
					<Navbar className="sticky-top" style={{ height: "90px" }} id="navId">
						<Navbar>
							<Navbar.Brand href="#home">
								<img
									src="https://medialab.unmsm.edu.pe/chiqaqnews/wp-content/uploads/2021/01/dia-star-wars.jpg"
									width="200"
									height="100"
									className="d-inline-block align-top"
									alt="React Bootstrap logo"
								/>
							</Navbar.Brand>
						</Navbar>
						<Navbar.Toggle aria-controls="ml-auto basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Link
								className="btn btn-lg text-light primary "
								bsStyle="primary"
								style={{ width: " 150px", background: "blue" }}
								to={`/register/`}>
								Register
							</Link>
							<Nav className="ml-auto text-white" style={{ width: " 150px" }}>
								<NavDropdown
									className="rounded bg-light text-dark"
									title="Favorite"
									style={{ width: "120px" }}
									id="basic-nav-dropdown">
									{currentFavorites.map((favorite, index) => {
										return (
											<NavDropdown.Item key={index} href="#action/3.1">
												{favorite.name}
												<span onClick={onRemoveFavorite(actions.removeFavorite, favorite)}>
													{" "}
													X
												</span>
											</NavDropdown.Item>
										);
									})}
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				);
			}}
		</Context.Consumer>
	);
};

Navigation.propTypes = {
	favorites: PropTypes.array
};

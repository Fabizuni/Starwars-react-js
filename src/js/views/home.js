import React from "react";

import { Card } from "../component/Card";
import "../../styles/home.scss";
import { Context } from "../store/appContext";

export const Home = () => {
	return (
		<Context.Consumer>
			{value => {
				const { store, actions } = value;
				return (
					<div>
						<div className="m-5">
							<h1 className="title text-light">Characters</h1>
						</div>
						<div
							className="card flex-row"
							style={{
								overflowX: "auto",
								background: "none",
								width: "1500px",
								margin: "0 auto"
							}}>
							{store.character.map(person => {
								return (
									<Card
										key={person.id}
										person={person}
										id={person.id}
										addFavorite={actions.addFavorite}
									/>
								);
							})}
						</div>
						<div className="m-5">
							<h1 className="title text-light">Planets</h1>
						</div>
						<div
							className="card flex-row"
							style={{
								overflowX: "auto",
								background: "none",
								width: "1500px",
								margin: "0 auto"
							}}>
							{store.planets.map(planet => {
								return (
									<Card
										key={planet.id}
										planet={planet}
										id={planet.id}
										addFavorite={actions.addFavorite}
									/>
								);
							})}
						</div>
					</div>
				);
			}}
		</Context.Consumer>
	);
};

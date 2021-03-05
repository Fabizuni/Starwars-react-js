import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const PersonProfile = ({ person }) => {
	return (
		<>
			<div className="row">
				<h1 className="card-title">{person.name}</h1>
			</div>
			<div className="row">
				<span className="card-title">{person.description}</span>
			</div>
			<div className="row my-3 d-flex align-content-start flex-wrap">
				<div className="col-3 my-2">Gender: {person.gender}</div>
				<div className="col-3 my-2">Hair color: {person.hair_color}</div>
				<div className="col-3 my-2">Skin color: {person.skin_color}</div>
				<div className="col-3 my-2">Eye color: {person.eye_color}</div>
				<div className="col-3 my-2">Mass: {person.mass}</div>
				<div className="col-3 my-2">Height: {person.height}</div>
				<div className="col-3 my-2">Birth year: {person.birth_year}</div>
			</div>
		</>
	);
};

const PlanetProfile = ({ planet }) => {
	return (
		<>
			<div className="row">
				<h1 className="card-title">{planet.name}</h1>
			</div>
			<div className="row">
				<span className="card-title">{planet.description}</span>
			</div>
			<div className="row my-3 d-flex align-content-start flex-wrap">
				<div className="col-3 my-2">Population: {planet.population}</div>
				<div className="col-3 my-2">Gravity: {planet.gravity}</div>
				<div className="col-3 my-2">Terrain: {planet.terrain}</div>
				<div className="col-3 my-2">Rotation Period: {planet.rotation_period}</div>
				<div className="col-3 my-2">Orbital period: {planet.orbital_period}</div>
				<div className="col-3 my-2">Diameter: {planet.diameter}</div>
				<div className="col-3 my-2">Climate: {planet.Climate}</div>
				<div className="col-3 my-2">Surface water: {planet.surface_water}</div>
			</div>
		</>
	);
};

export const Profile = () => {
	const { entity, id } = useParams();
	const storeContext = useContext(Context);
	const {
		store: { characterEntity, planetsEntity }
	} = storeContext;

	useEffect(
		() => {
			storeContext.actions.fetchEntity(entity, id);
		},
		[entity, id]
	);
	return (
		<div
			className="container mb-5 my-5"
			style={{ background: "grey", maxWidth: "1338px", paddingTop: "192px", paddingBottom: "250px" }}>
			<div className="row">
				<img
					className="card-img-top"
					style={{ width: "738px", height: "500px", margin: "0 auto" }}
					src="https://images.mediotiempo.com/Q3JLKOwPAZjcdK-6u406n-REY-g=/958x596/uploads/media/2020/02/19/star-wars-franquicias-cine-ciencia.jpg"
					alt="Card image cap"
				/>
			</div>
			<div style={{ color: "white", paddingLeft: "42px" }}>
				{characterEntity.name ? (
					<PersonProfile person={characterEntity} />
				) : (
					<PlanetProfile planet={planetsEntity} />
				)}
			</div>
		</div>
	);
};

PlanetProfile.propTypes = {
	planet: PropTypes.object
};

PersonProfile.propTypes = {
	person: PropTypes.object
};

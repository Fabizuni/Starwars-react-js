import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PersonCard = ({ person }) => {
	return (
		<>
			<h5 className="card-title">{person.name}</h5>
			<ul className="list-unstyled">
				<li>Gender: {person.gender}</li>
				<li>Hair-Color: {person.hair_color}</li>
				<li>Eye-Color: {person.eye_color}</li>
			</ul>
		</>
	);
};

const PlanetCard = ({ planet }) => {
	return (
		<>
			<h5 className="card-title">{planet.name}</h5>
			<ul className="list-unstyled">
				<li>Population: {planet.population}</li>
				<li>Terrain: {planet.terrain}</li>
			</ul>
		</>
	);
};

export const Card = ({ person, planet, id, addFavorite }) => {
	const onFavoriteHandler = useCallback(() => {
		const entity = person ? "person" : "planet";
		const id = person ? person.id : planet.id;
		addFavorite(entity, id);
	});
	return (
		<div className="card mx-3" style={{ minWidth: "250px" }}>
			<img
				className="card-img-top"
				src="https://i.blogs.es/69fdcc/star-wars-saga/1366_2000.jpg"
				alt="Card image cap"
			/>
			<div className="card-body">
				{person ? <PersonCard person={person} /> : <PlanetCard planet={planet} />}
				<div className="d-flex justify-content-between mt-5 align-items-center">
					<Link
						className="btn btn-sm btn-outline-primary"
						to={`/profile/${person ? "character" : "planets"}/${id}`}>
						Learn more
					</Link>
					<i className="ml-5 far fa-heart btn-outline-danger" onClick={onFavoriteHandler} />
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	addFavorite: PropTypes.func,
	person: PropTypes.object,
	planet: PropTypes.object,
	id: PropTypes.string
};

PlanetCard.propTypes = {
	planet: PropTypes.object
};

PersonCard.propTypes = {
	person: PropTypes.object
};

import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [redirect, setRedirect] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		if (email === "" || pass === "") {
			alert("correo y contraseña son requeridos");
		}
		console.log(email, pass);

		// FETCH
		const data = { email: email, password: pass };

		fetch("https://3000-gray-marlin-8q5nd8h3.ws-us03.gitpod.io/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
				sessionStorage.setItem("u_token", data.token);
				setRedirect(true);
			})
			.catch(error => {
				console.error("Error:", error);
			});

		// setRedirect(true);
	};

	return (
		<div
			className="container text-center mt-5 d-flex justify-content-center align-items-center rounded"
			style={{ maxWidth: "950px", background: "white", paddingTop: "92px", paddingBottom: "92px" }}>
			<form style={{ width: "400px" }} onSubmit={e => handleSubmit(e)}>
				<div>
					<img
						src="https://i.ytimg.com/vi/3nr4tRNE8QE/maxresdefault.jpg"
						className="card-img-top"
						style={{ marginBottom: "16px" }}
						alt="welcome"
					/>
				</div>
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						onChange={e => setEmail(e.target.value)}
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						onChange={e => setPass(e.target.value)}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
				<div>
					<Link
						className="btn btn-lg text-light primary "
						bsStyle="primary"
						style={{ width: " 150px", background: "blue", marginTop: "16px" }}
						to={`/register/`}>
						Register
					</Link>
				</div>
			</form>
			{redirect ? <Redirect to="/" /> : ""}
		</div>
	);
};

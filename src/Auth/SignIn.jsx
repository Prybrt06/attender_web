import { useNavigate, Link } from "react-router-dom";
import "../Add.css";

import "./Auth.css";

import Cookies from "js-cookie";

import { useEffect, useState } from "react";

const SignIn = () => {
	const token = Cookies.get("token") ?? "";
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	console.log(token);

	useEffect(() => {
		if (token !== "") {
			navigate("/");
		}
	}, []);

	const signIn = async () => {
		console.log(username);
		const res = await fetch(
			"https://attender-backend.onrender.com/signin",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			}
		);
		
		const json = await res.json();

		if (res.status == 201) {
			console.log(json.token);
			Cookies.set("token", json.token, { expires: 7, secure: true });

			navigate("/");
		}
		else {
			alert(json.message);
		}

		// setPassword(json.message);
	};
	return (
		<div>
			<h2>Signin</h2>
			<section>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						await signIn();
					}}
				>
					<label htmlFor="username">
						<h4>Username</h4>
						<input
							type="text"
							value={username}
							placeholder="Username"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</label>
					<label htmlFor="password">
						<h4>Password</h4>
						<input
							type="password"
							value={password}
							placeholder="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</label>
					<section id="auth-buttons">
						<button type="submit">Signin</button>
						<button>
							<Link to="/signup">Signup</Link>
						</button>
					</section>
				</form>
			</section>
		</div>
	);
};

export default SignIn;

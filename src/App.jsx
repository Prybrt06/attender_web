import { useEffect, useState } from "react";
import "./App.css";
import Subjects from "./Subjects/Subjects";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function App() {
	const [subjects, setSubjects] = useState([]);
	const [update, setUpd] = useState(false);
	const navigate = useNavigate();

	const token = Cookies.get("token") ?? "";
	useEffect(() => {
		if (token === "") {
			navigate("/signin");
		}
		requestSubjects();
	}, [update]);

	const requestSubjects = async () => {
		const token = Cookies.get("token") ?? "";
		let response = await fetch(
			`https://attender-backend.onrender.com/subject`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const json = await response.json();

		setSubjects(json?.subjects ?? []);

		// console.log(json.subjects);
		// console.log(subjects);
	};

	const logout = async () => {
		const response = await window.confirm("Do you want to logout?")

		if(response)
		{
			Cookies.remove("token");
			setUpd((prev) => !prev);
		}
	};

	return (
		<div>
			<nav>
				<h2>Subjects</h2>
				<div>
					<Link to="/add">Add</Link>
					<Link onClick={logout}>Log out</Link>
				</div>
			</nav>
			<Subjects subjects={subjects} setupdHandler={setUpd} />
		</div>
	);
}

export default App;

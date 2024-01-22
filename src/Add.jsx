import { useNavigate } from "react-router-dom";
import "./Add.css";

import { useState } from "react";
import Cookies from "js-cookie";

const Add = () => {
	const [subjectName, setSubjectName] = useState("");
	const [subjectCode, setSubjectCode] = useState("");
	const navigate = useNavigate();
	const addSubject = async () => {
		const token = Cookies.get("token") ?? "";
		const res = await fetch(
			"https://attender-backend.onrender.com/subject/create",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					name: subjectName,
					subjectCode: subjectCode,
				}),
			}
		);

		if (res.status == 201) {
			navigate("/");
			alert("Subject created successfully")
		} else {
			alert("unable to create subject")
		}
	};

	return (
		<div>
			<h2>Add Subject</h2>
			<section>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						await addSubject();
					}}
				>
					<label htmlFor="subjectName">
						<h4>Subject Name</h4>
						<input
							type="text"
							value={subjectName}
							placeholder="subject name"
							onChange={(e) => {
								setSubjectName(e.target.value);
							}}
						/>
					</label>
					<label htmlFor="subjectCode">
						<h4>Subject Code</h4>
						<input
							type="text"
							value={subjectCode}
							placeholder="subject code"
							onChange={(e) => {
								setSubjectCode(e.target.value);
							}}
						/>
					</label>
					<button>Add</button>
				</form>
			</section>
		</div>
	);
};

export default Add;

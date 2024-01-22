import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./Add.jsx";
import SignIn from "./Auth/SignIn.jsx";
import UpdateSubject from "./UpdateSubject/UpdateSubject.jsx";
import SignUp from "./Auth/SignUp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}></Route>
				<Route path="/signin" element={<SignIn />}></Route>
				<Route path="/signup" element={<SignUp />}></Route>
				<Route path="/update" element={<UpdateSubject />}></Route>
				<Route path="/add" element={<Add />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

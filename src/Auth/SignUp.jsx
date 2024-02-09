import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Auth.css";

import Cookies from "js-cookie";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    const res = await fetch("https://attender-backend.onrender.com/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        mail: mail,
        password: password,
      }),
    });

    const json = await res.json();

    if (res.status == 201) {
      console.log(json.token);
      Cookies.set("token", json.token, { expires: 7, secure: true });

      navigate("/");
    } else {
      alert(json.message);
    }
  };
  return (
    <div>
      <h2>Signup</h2>
      <section>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await signUp();
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
          <label htmlFor="mail">
            <h4>Mail</h4>
            <input
              type="text"
              value={mail}
              placeholder="mail"
              onChange={(e) => {
                setMail(e.target.value);
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
            <button type="submit">Signup</button>
            <button>
              <Link to="/signin">Signin</Link>
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};

export default SignUp;

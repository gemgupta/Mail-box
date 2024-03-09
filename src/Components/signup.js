import { useState } from "react";
import "./signup.css";
import Login from "./Login";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [isSignup, setisSignup] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === conPassword) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4HsmYkW2Fj3xbjJKwuorRCa9vxvsqIs0",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
            headers: {
              "content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error.message);
        } else {
          console.log("user has successfully signed up");
          setisSignup(true);
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert("password do not match");
    }

    setEmail("");
    setPassword("");
    setConPassword("");
  };
  return (
    <div>
      {isSignup && <Login />}
      {!isSignup && (
        <form onSubmit={submitHandler} className="signup-form">
          <h1 className="h1">Sign up</h1>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          />
          <label className="label" htmlFor="confirmPass">
            Confirm password
          </label>
          <input
            className="input"
            type="password"
            name="confirmPass"
            id="confirmPass"
            onChange={(e) => {
              setConPassword(e.target.value);
            }}
            value={conPassword}
            required
          />
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      )}
      {isSignup ? (
        <p className="p" onClick={() => setisSignup(false)}>
          Don't have an account? Click to sign up.
        </p>
      ) : (
        <p className="p" onClick={() => setisSignup(true)}>
          Already have an account? Click to sign in.
        </p>
      )}
    </div>
  );
}

export default Signup;

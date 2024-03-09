import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4HsmYkW2Fj3xbjJKwuorRCa9vxvsqIs0",
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
        const tokenData = await response.json();
        // dispatch(authActions.login());
        // dispatch(authActions.setEmail(tokenData.email));
        // dispatch(authActions.setToken(tokenData.idToken));
        // Authctx.Login(tokenData.idToken, tokenData.email);
        localStorage.setItem("email", tokenData.email);
        localStorage.setItem("key", tokenData.idToken);
        console.log("Login success");
        navigate("/welcome");
      }
    } catch (error) {
      alert(error);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <>
      <form onSubmit={submitHandler} className="signup-form">
        <h1 className="h1">Sign In</h1>
        <label className="label" htmlFor="email">Email</label>
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
        <label className="label" htmlFor="password">Password</label>
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
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    </>
  );
}

export default Login;

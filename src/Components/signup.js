import React from "react";
import { useState } from "react";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
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
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        <label htmlFor="confirmPass">Confirm password</label>
        <input
          type="password"
          name="confirmPass"
          id="confirmPass"
          onChange={(e) => {
            setConPassword(e.target.value);
          }}
          value={conPassword}
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default Signup;

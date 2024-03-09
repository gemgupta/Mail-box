import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function InboxPage() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [showEditor, setshowEditor] = useState(false);
  const sendMailHandler = async () => {
    const mailData = {
      subject,
      value,
    };
    setEmail("");
    setSubject("");
    setValue("");
    try {
      const userModifiedEmail = email.replace(/[.@]/g, "");
      const response = await fetch(
        `https://mail-box-dc2a8-default-rtdb.firebaseio.com/${userModifiedEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: { "Content-Type": "Application/json" },
        }
      );
      console.log("djs", response);
      if (!response.ok) {
        throw new Error("Something went wrong. Sending failed");
      } else {
        const data1 = await response.json();
        console.log(data1);
      }
    } catch (error) {
      alert(error.messages);
    }
  };
  return (
    <>
      <Navbar />
      <button
        type="button"
        className="btn btn-primary "
        onClick={() => setshowEditor(true)}
      >
        Compose Mail
      </button>
      {showEditor && (
        <div className="container ">
          <input
            type="email"
            className="h-100 w-50 m-auto d-block"
            placeholder="To"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="h-100 w-50 m-auto d-block"
            placeholder="Subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            style={{
              height: "440px",
              width: "50%",
              display: "block",
              margin: "auto",
            }}
          />
          <br />
          <br />
          <button
            className="btn btn-success w-25 position-relative start-50"
            type="submit"
            onClick={sendMailHandler}
          >
            Send
          </button>
          <button
            className="btn btn-danger w-25"
            type="submit"
            onClick={() => setshowEditor(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default InboxPage;

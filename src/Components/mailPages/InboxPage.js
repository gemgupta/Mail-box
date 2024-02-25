import React from "react";
import Navbar from "./Navbar";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function InboxPage() {
  return (
    <>
    <Navbar/>
      <button type="button" className="btn btn-primary " >Compose Mail</button>
      <Editor
//   editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
//   onEditorStateChange={this.onEditorStateChange}
/>;
    </>
  );
}

export default InboxPage;

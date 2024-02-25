import "./App.css";
import InboxPage from "./Components/mailPages/InboxPage";
import Signup from "./Components/signup";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/welcome" element={<InboxPage />} />
        <Route exact path="/" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

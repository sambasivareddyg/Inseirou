import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import AllPiesComponent from "./components/ApplePieComponent";
import FruitPiesComponent from "./components/FruitPiesComponent";
import ApplePieComponent from "./components/ApplePieComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/allPies" element={<AllPiesComponent />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/fruitpies" element={<FruitPiesComponent />} />
        <Route path="/applepie" element={<ApplePieComponent />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

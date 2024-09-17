import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Contact from "./components/ContactComponent";
import AllPiesComponent from "./components/AllPiesComponent";
import FruitPiesComponent from "./components/FruitPiesComponent";
import ApplePieComponent from "./components/ApplePieComponent";
import CheeseCakesComponent from "./components/CheeseCakesComponent";
import SeasonalPiesComponent from "./components/SeasonalPiesComponent";
import PieSubscription from "./components/PieSubscription";
import ContactComponent from "./components/ContactComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactComponent />} />
        <Route path="/fruitpies" element={<FruitPiesComponent />} />
        <Route path="/applepie" element={<ApplePieComponent />} />
        <Route path="/cheesecakes" element={<CheeseCakesComponent />} />
        <Route path="/allpies" element={<AllPiesComponent />} />
        <Route path="/seasonalpies" element={<SeasonalPiesComponent />} />
        <Route path="/piesubscription" element={<PieSubscription />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

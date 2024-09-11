import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap-override.css";
import "./assets/css/custom.css";
import CustomNavbar from "./components/CustomNavbar";
import CarouselComponent from "./components/CarouselComponent";
import BreadcrumbComponent from "./components/BreadcrumbComponent";
import HistoryComponent from "./components/HistoryComponent";
import ProductsOfTheWeekComponent from "./components/ProductsOfTheWeekComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <CustomNavbar />
      <main className="container" role="main">
        <BreadcrumbComponent />
        <CarouselComponent />
        <HistoryComponent />
        <ProductsOfTheWeekComponent />
      </main>
    </div>
  );
}

export default App;

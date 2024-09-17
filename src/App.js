import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap-override.css";
import "./assets/css/custom.css";
import CustomNavbar from "./components/CustomNavbarComponent";
import CarouselComponent from "./components/CarouselComponent";
import BreadcrumbComponent from "./components/BreadcrumbComponent";
import HistoryComponent from "./components/HistoryComponent";
import ProductsOfTheWeekComponent from "./components/ProductsOfTheWeekComponent";

function App() {
  return (
    <div className="App">
      <main className="container" role="main">
        <CustomNavbar />
        <CarouselComponent />
        <BreadcrumbComponent />
        <HistoryComponent />
        <ProductsOfTheWeekComponent />
      </main>
    </div>
  );
}

export default App;

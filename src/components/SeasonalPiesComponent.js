import "../App.css";
import piepng from "../assets/images/pie.png";
import { Link } from "react-router-dom";
import applepie from "../assets/images/products/applepie.jpg";
import christmasapplepiesmallsquare from "../assets/images/products/christmasapplepiesmallsquare.jpg";
import cranberrypiesmallsquare from "../assets/images/products/cranberrypiesmallsquare.jpg";
import pumpkinpiesmallsquare from "../assets/images/products/pumpkinpiesmallsquare.jpg";
import rhubarbpiesmall from "../assets/images/products/rhubarbpiesmall.jpg";
import cps from "../assets/images/products/cranberrypiesmall.jpg";
import pkps from "../assets/images/products/pumpkinpiesmall.jpg";
import applepiesmall from "../assets/images/products/applepiesmall.jpg";
import cherrypiesmall from "../assets/images/products/cherrypiesmall.jpg";
import peachpiesmall from "../assets/images/products/peachpiesmall.jpg";
import strawberrypiesmall from "../assets/images/products/strawberrypiesmall.jpg";
import CustomNavbar from "./CustomNavbar";

function SeasonalPiesComponent() {
  return (
    <div>
      <CustomNavbar />
      <main role="main">
        <div class="container-fluid jumbotron jumbotron-seasonal-pies py-5">
          <div class="container">
            <h1 class="display-3 fw-bold text-white">
              Enjoy the festivities with our seasonal pies.
            </h1>
          </div>
        </div>

        <div class="container">
          <nav class="my-3 ms-3" style={{ "bs-breadcrumb-divider": ">" }}>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/">Pies</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Seasonal pies
              </li>
            </ol>
          </nav>
          <div class="row">
            <div class="col-md-4">
              <img
                width="175"
                height="175"
                src={christmasapplepiesmallsquare}
              ></img>
              <h2>Christmas apple pie</h2>
              <p>Happy holidays with this pie!</p>
              <p>
                <Link class="btn btn-primary" to="/applepie" role="button">
                  View details
                </Link>
              </p>
            </div>
            <div class="col-md-4">
              <img width="175" height="175" src={cranberrypiesmallsquare}></img>
              <h2>Cranberry pie</h2>
              <p>A Christmas favorite</p>
              <p>
                <Link class="btn btn-primary" to="/applepie" role="button">
                  View details
                </Link>
              </p>
            </div>
            <div class="col-md-4">
              <img width="175" height="175" src={pumpkinpiesmallsquare}></img>
              <h2>Pumpkin pie</h2>
              <p>Our Halloween favorite</p>
              <p>
                <Link class="btn btn-primary" to="/applepie" role="button">
                  View details
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default SeasonalPiesComponent;

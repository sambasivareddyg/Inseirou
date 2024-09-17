import "../App.css";
import piepng from "../assets/images/pie.png";
import { Link } from "react-router-dom";
import applepie from "../assets/images/products/applepie.jpg";
import sbp from "../assets/images/products/strawberrypiesmall.jpg";
import blueberrycheesecakesmall from "../assets/images/products/blueberrycheesecakesmall.jpg";
import cheesecakesmall from "../assets/images/products/cheesecakesmall.jpg";
import strawberrycheesecakesmall from "../assets/images/products/strawberrycheesecakesmall.jpg";
import rhubarbpiesmall from "../assets/images/products/rhubarbpiesmall.jpg";
import cps from "../assets/images/products/cranberrypiesmall.jpg";
import pkps from "../assets/images/products/pumpkinpiesmall.jpg";
import applepiesmall from "../assets/images/products/applepiesmall.jpg";
import cherrypiesmall from "../assets/images/products/cherrypiesmall.jpg";
import peachpiesmall from "../assets/images/products/peachpiesmall.jpg";
import strawberrypiesmall from "../assets/images/products/strawberrypiesmall.jpg";
import CustomNavbar from "./CustomNavbar";

function CheeseCakesComponent() {
  return (
    <div>
      <CustomNavbar />
      <main role="main">
        <div class="container-fluid jumbotron jumbotron-cheese-cakes py-5">
          <div class="container">
            <h1 class="display-3 fw-bold text-white">
              Our tasty cheese cakes.
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
                <Link to="#">Pies</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Cheese cakes{" "}
              </li>
            </ol>
          </nav>
          <div class="row">
            <div class="col-md-4">
              <div class="card rounded mb-4 shadow-sm">
                <img class="card-img-top" src={blueberrycheesecakesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Blueberry cheese cake</h5>
                  <p class="card-text">You'll love it! </p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card rounded mb-4 shadow-sm">
                <img class="card-img-top" src={cheesecakesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Cheese cake</h5>
                  <p class="card-text">Plain cheese cake. Plain pleasure.</p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card rounded mb-4 shadow-sm">
                <img class="card-img-top" src={strawberrycheesecakesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Strawberry cheese cake</h5>
                  <p class="card-text">You'll love it! </p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default CheeseCakesComponent;

import "../App.css";
import { Link } from "react-router-dom";
import blueberrycheesecakesmall from "../assets/images/products/blueberrycheesecakesmall.jpg";
import cheesecakesmall from "../assets/images/products/cheesecakesmall.jpg";
import strawberrycheesecakesmall from "../assets/images/products/strawberrycheesecakesmall.jpg";
import CustomNavbarComponent from "./CustomNavbarComponent";

function CheeseCakesComponent() {
  return (
    <div>
      <CustomNavbarComponent />
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

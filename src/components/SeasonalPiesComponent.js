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

function SeasonalPiesComponent() {
  return (
    <div>
      <header>
        <nav
          class="navbar navbar-expand-lg navbar-dark fixed-top bg-primary"
          aria-label="Bethany's Pie Shop navigation header"
        >
          <div class="container">
            <Link class="navbar-brand" to="/">
              <img
                src={piepng}
                width="30"
                height="30"
                class="d-inline-block align-top"
                alt="Bethany's Pie Shop Logo"
              ></img>
              Bethany's Pie Shop
            </Link>

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <Link class="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li class="nav-item dropdown">
                  <Link
                    class="nav-link dropdown-toggle active"
                    to="/"
                    id="nav-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pies
                    <span class="visually-hidden">(current)</span>
                  </Link>
                  <ul class="dropdown-menu" aria-labelledby="nav-dropdown">
                    <li>
                      <Link class="dropdown-item" to="/fruitpies">
                        Fruit Pies
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="/cheesecakes">
                        Cheese cakes
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="/seasonalpies">
                        Seasonal Pies
                      </Link>
                    </li>
                    <li>
                      <hr class="dropdown-divider"></hr>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="/allpies">
                        All pies
                      </Link>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/piesubscription">
                    Pie subscription
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
              <form>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search pies"
                  aria-label="Search"
                ></input>
              </form>
            </div>
          </div>
        </nav>
      </header>
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

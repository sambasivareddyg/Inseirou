import "../App.css";
import CustomNavbar from "./CustomNavbar";
import { Link } from "react-router-dom";
import applepie from "../assets/images/products/applepie.jpg";
import sbp from "../assets/images/products/strawberrypiesmall.jpg";
import rbps from "../assets/images/products/rhubarbpiesmall.jpg";
import pps from "../assets/images/products/peachpiesmall.jpg";
import cps from "../assets/images/products/cranberrypiesmall.jpg";
import pkps from "../assets/images/products/pumpkinpiesmall.jpg";
import applepiesmall from "../assets/images/products/applepiesmall.jpg";
function AllPiesComponent() {
  return (
    <div>
      <CustomNavbar />
      <header>
        <nav
          class="navbar navbar-expand-lg navbar-dark fixed-top bg-primary"
          aria-label="Bethany's Pie Shop navigation header"
        >
          <div class="container">
            <a class="navbar-brand" href="index.html">
              <img
                src="images/pie.png"
                width="30"
                height="30"
                class="d-inline-block align-top"
                alt="Bethany's Pie Shop Logo"
              />
              Bethany's Pie Shop
            </a>

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
                  <a class="nav-link" aria-current="page" href="index.html">
                    Home
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle active"
                    href="#"
                    id="nav-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pies
                    <span class="visually-hidden">(current)</span>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="nav-dropdown">
                    <li>
                      <a class="dropdown-item" href="fruitpies.html">
                        Fruit Pies
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="cheesecakes.html">
                        Cheese cakes
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="seasonalpies.html">
                        Seasonal Pies
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" href="allpies.html">
                        All pies
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="piesubscription.html">
                    Pie subscription
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="contact.html">
                    Contact
                  </a>
                </li>
              </ul>
              <form>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search pies"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
        </nav>
      </header>

      <main role="main">
        <div class="container-fluid jumbotron jumbotron-all-pies py-5">
          <div class="container">
            <h1 class="display-3 fw-bold text-white">Our delicious pies.</h1>
          </div>
        </div>

        <div class="container">
          <nav
            aria-label="breadcrumb"
            style="--bs-breadcrumb-divider: '>'"
            class="my-3 ms-3"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li class="breadcrumb-item">
                <a href="#">Pies</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                All pies
              </li>
            </ol>
          </nav>

          <div class="row" data-masonry='{"percentPosition": true }'>
            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card p-3">
                <figure class="p-3 mb-0">
                  <blockquote class="blockquote">
                    <p>All of our pies are created with natural ingredients.</p>
                  </blockquote>
                  <figcaption class="blockquote-footer mb-0 text-muted">
                    Bethany
                  </figcaption>
                </figure>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/applepiesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Apple pie</h5>
                  <p class="card-text">Our famous apple pies!</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/blueberrycheesecakesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Blueberry cheese cake</h5>
                  <p class="card-text">You'll love it!</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/cheesecakesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Cheese cake</h5>
                  <p class="card-text">Plain cheese cake. Plain pleasure.</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card bg-primary text-white text-center p-3">
                <figure class="mb-0">
                  <blockquote class="blockquote">
                    <p>
                      Bethany's Pie Shop bakes the most delicious pies you have
                      ever tasted.
                    </p>
                  </blockquote>
                  <figcaption class="blockquote-footer mb-0 text-white">
                    Laura Peach in
                    <cite title="Source Title">The Pie Observer</cite>
                  </figcaption>
                </figure>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/cherrypiesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Cherry pie</h5>
                  <p class="card-text">A summer classic!</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/christmasapplepiesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Christmas apple pie</h5>
                  <p class="card-text">Happy holidays with this pie!</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/cranberrypiesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Cranberry pie</h5>
                  <p class="card-text">A Christmas favorite</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/peachpiesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Peach pie</h5>
                  <p class="card-text">Sweet as peach</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img src="images/carousel1.jpg" />
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/pumpkinpiesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Pumpkin pie</h5>
                  <p class="card-text">Our Halloween favorite</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/rhubarbpiesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Rhubarb pie</h5>
                  <p class="card-text">My God, so sweet!</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card p-3 text-end">
                <figure class="mb-0">
                  <blockquote class="blockquote">
                    <p>You NEED to taste these. Trust me.</p>
                  </blockquote>
                  <figcaption class="blockquote-footer mb-0 text-muted">
                    Jack Baker in{" "}
                    <cite title="Source Title">The Daily Pie</cite>
                  </figcaption>
                </figure>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/strawberrycheesecakesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Strawberry cheese cake</h5>
                  <p class="card-text">You'll love it!</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/products/strawberrypiesmall.jpg"
                />
                <div class="card-body">
                  <h5 class="card-title">Strawberry pie</h5>
                  <p class="card-text">Our delicious strawberry pie!</p>
                </div>
                <div class="card-footer">
                  <a href="applepie.html" class="btn btn-primary">
                    View details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default AllPiesComponent;

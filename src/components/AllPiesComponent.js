import "../App.css";
import piepng from "../assets/images/pie.png";
import { Link } from "react-router-dom";
import carousel1 from "../assets/images/carousel1.jpg";
import strawberrypiesmall from "../assets/images/products/strawberrypiesmall.jpg";
import strawberrycheesecakesmall from "../assets/images/products/strawberrycheesecakesmall.jpg";
import rhubarbpiesmall from "../assets/images/products/rhubarbpiesmall.jpg";
import peachpiesmall from "../assets/images/products/peachpiesmall.jpg";
import cranberrypiesmall from "../assets/images/products/cranberrypiesmall.jpg";
import pumpkinpiesmall from "../assets/images/products/pumpkinpiesmall.jpg";
import applepiesmall from "../assets/images/products/applepiesmall.jpg";
import cherrypiesmall from "../assets/images/products/cherrypiesmall.jpg";
import cheesecakesmall from "../assets/images/products/cheesecakesmall.jpg";
import blueberrycheesecakesmall from "../assets/images/products/blueberrycheesecakesmall.jpg";
import christmasapplepiesmall from "../assets/images/products/christmasapplepiesmall.jpg";
function AllPiesComponent() {
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
        <div class="container-fluid jumbotron jumbotron-all-pies py-5">
          <div class="container">
            <h1 class="display-3 fw-bold text-white">Our delicious pies.</h1>
          </div>
        </div>

        <div class="container">
          <nav
            aria-label="breadcrumb"
            style={{ "bs-breadcrumb-divider": ">" }}
            class="my-3 ms-3"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/">Pies</Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/allpies">AllPies</Link>
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
                <img class="card-img-top" src={applepiesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Apple pie</h5>
                  <p class="card-text">Our famous apple pies!</p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
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

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img class="card-img-top" src={cheesecakesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Cheese cake</h5>
                  <p class="card-text"> Plain cheese cake. Plain pleasure.</p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
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
                    Laura Peach in{" "}
                    <cite title="Source Title">The Pie Observer</cite>
                  </figcaption>
                </figure>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img class="card-img-top" src={cherrypiesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Cherry pie</h5>
                  <p class="card-text">A summer classic!</p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img class="card-img-top" src={christmasapplepiesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Christmas apple pie</h5>
                  <p class="card-text">Happy holidays with this pie! </p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img class="card-img-top" src={cranberrypiesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Cranberry pie</h5>
                  <p class="card-text">A Christmas favorite </p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img class="card-img-top" src={peachpiesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Peach pie</h5>
                  <p class="card-text">Sweet as peach</p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img src={carousel1}></img>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img class="card-img-top" src={pumpkinpiesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Pumpkin pie</h5>
                  <p class="card-text">Our Halloween favorite </p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img class="card-img-top" src={rhubarbpiesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Rhubarb pie</h5>
                  <p class="card-text">My God, so sweet!</p>
                </div>
                <div class="card-footer">
                  <Link to="/applepie" class="btn btn-primary">
                    View details
                  </Link>
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

            <div class="col-sm-6 col-lg-4 mb-4">
              <div class="card">
                <img class="card-img-top" src={strawberrypiesmall}></img>
                <div class="card-body">
                  <h5 class="card-title">Strawberry pie</h5>
                  <p class="card-text">Our delicious strawberry pie!</p>
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
export default AllPiesComponent;

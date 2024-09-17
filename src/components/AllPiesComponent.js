import "../App.css";
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
import CustomNavbarComponent from "./CustomNavbarComponent";

function AllPiesComponent() {
  return (
    <div>
      <CustomNavbarComponent />
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

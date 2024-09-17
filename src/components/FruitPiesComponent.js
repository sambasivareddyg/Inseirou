import "../App.css";
import piepng from "../assets/images/pie.png";
import { Link } from "react-router-dom";
import applepie from "../assets/images/products/applepie.jpg";
import sbp from "../assets/images/products/strawberrypiesmall.jpg";
import rhubarbpiesmall from "../assets/images/products/rhubarbpiesmall.jpg";
import cps from "../assets/images/products/cranberrypiesmall.jpg";
import pkps from "../assets/images/products/pumpkinpiesmall.jpg";
import applepiesmall from "../assets/images/products/applepiesmall.jpg";
import cherrypiesmall from "../assets/images/products/cherrypiesmall.jpg";
import peachpiesmall from "../assets/images/products/peachpiesmall.jpg";
import strawberrypiesmall from "../assets/images/products/strawberrypiesmall.jpg";
import CustomNavbar from "./CustomNavbar";
function FruitPiesComponent() {
  return (
    <div>
      <CustomNavbar />
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
                <Link to="/fruitpies"></Link>
                Fruit pies
              </li>
            </ol>
          </nav>

          <div class="accordion" id="fruitPiesAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Taste the summer
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#fruitPiesAccordion"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
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
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
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
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
                        <img
                          class="card-img-top"
                          src={strawberrypiesmall}
                        ></img>
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
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Pies to warm you during the cold days
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#fruitPiesAccordion"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
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
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
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
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  All fruit pies
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#fruitPiesAccordion"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
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
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
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
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
                        <img class="card-img-top" src={peachpiesmall}></img>
                        <div class="card-body">
                          <h5 class="card-title">Peach pie</h5>
                          <p class="card-text">Sweet as peach</p>
                        </div>
                        <div class="card-footer">
                          <Link href="/applepie" class="btn btn-primary">
                            View details
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
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
                    <div class="col-md-4">
                      <div class="card rounded mb-4 shadow-sm">
                        <img
                          class="card-img-top"
                          src={strawberrypiesmall}
                        ></img>
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default FruitPiesComponent;

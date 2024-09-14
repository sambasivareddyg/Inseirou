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
function FruitPiesComponent() {
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
                <Link href="/">Home</Link>
              </li>
              <li class="breadcrumb-item">
                <Link href="#">Pies</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                All pies
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

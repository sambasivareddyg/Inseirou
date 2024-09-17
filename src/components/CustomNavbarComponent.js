import "../assets/css/CustomNavbar.css";
import piepng from "../assets/images/pie.png";
import { Link } from "react-router-dom";

function CustomNavbarComponent() {
  return (
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
  );
}
export default CustomNavbarComponent;

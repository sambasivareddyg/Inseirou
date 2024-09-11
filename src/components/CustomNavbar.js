import "../assets/css/CustomNavbar.css";
import piepng from "../assets/images/pie.png";
import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img
              src={piepng}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Bethany's Pie Shop Logo"
            />
            Bethany's Pie Shop
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="nav navbar-nav mr-auto">
              <li className="nav-item ">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="nav-dropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pies
                </Link>
                <ul className="dropdown-menu" aria-labelledby="nav-dropdown">
                  <li>
                    <Link className="dropdown-item" to="/fruitpies">
                      Fruit Pies
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/cheesecakes">
                      Cheese cakes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/seasonalpies">
                      Seasonal Pies
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/allPies">
                      All pies
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to="/piesubscription">
                  Pie subscription
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default CustomNavbar;

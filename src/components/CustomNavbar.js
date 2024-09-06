import '../assets/css/CustomNavbar.css'
import piepng from '../assets/images/pie.png';

function CustomNavbar() {
  return (
  <header>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
            <div className="container">
                <a className="navbar-brand" href="index.html">
                    <img src={piepng} width="30" height="30" className="d-inline-block align-top"
                        alt="Bethany's Pie Shop Logo"/>
                    Bethany's Pie Shop
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item ">
                            <a className="nav-link active" href="index.html">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="nav-dropdown" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Pies
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="nav-dropdown">
                                <li><a className="dropdown-item" href="fruitpies.html">Fruit Pies</a></li>
                                <li><a className="dropdown-item" href="cheesecakes.html">Cheese cakes</a></li>
                                <li><a className="dropdown-item" href="seasonalpies.html">Seasonal Pies</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="allpies.html">All pies</a></li>
                            </ul>
                        </li>
                       
                        <li className="nav-item">
                            <a className="nav-link " href="piesubscription.html">
                                Pie subscription
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </header>
  );
}
export default CustomNavbar;
  
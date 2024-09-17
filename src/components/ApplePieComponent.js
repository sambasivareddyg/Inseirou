import "../App.css";
import CustomNavbarComponent from "./CustomNavbarComponent";
import { Link } from "react-router-dom";
import applepie from "../assets/images/products/applepie.jpg";
import sbp from "../assets/images/products/strawberrypiesmall.jpg";
import rbps from "../assets/images/products/rhubarbpiesmall.jpg";
import pps from "../assets/images/products/peachpiesmall.jpg";
import cps from "../assets/images/products/cranberrypiesmall.jpg";
import pkps from "../assets/images/products/pumpkinpiesmall.jpg";
import applepiesmall from "../assets/images/products/applepiesmall.jpg";

function ApplePieComponent() {
  return (
    <div>
      <CustomNavbarComponent />
      <main role="main">
        <div className="container-fluid jumbotron jumbotron-detail-apple-pie py-5">
          <div className="container">
            <h1 className="display-3 fw-bold text-white">Apple pie</h1>
          </div>
        </div>

        <div className="container">
          <nav
            className="my-3 ms-3"
            style={{ "--bs-breadcrumb-divider": "'>'" }}
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pies</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/fruitpies">Fruit pies</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Apple pie
              </li>
            </ol>
          </nav>

          <h1 className="fw-bolder">
            Apple pie
            <small className="fw-normal fst-italic">
              Our famous, number-one selling pie.
            </small>
          </h1>

          <div className="row ">
            <div className="col-6 col-lg-8">
              <img src={applepie} className="img-fluid rounded-1"></img>
            </div>

            <div className="col-6 col-lg-4">
              <h3 className="my-3">About this pie</h3>
              <p className="lead text-center">Increase your apple pie intake</p>
              <p className="user-select-none">
                Sweet ice cream jelly beans lemon drops.{" "}
                <small>Pastry toffee fruitcake </small>gingerbread jelly-o.
                Lollipop sesame snaps muffin.{" "}
                <strong>Macaroon halvah marshmallow </strong>sesame snaps sugar
                plum dragée. Wafer pudding sesame snaps tootsie{" "}
                <mark>roll sesame snaps</mark> cake chupa chups jelly beans.
              </p>
              <h3>Ingredients</h3>
              <ul>
                <li>Apple</li>
                <li>Sugar</li>
                <li>Eggs</li>
                <li>Milk</li>
              </ul>
              <div className="row">
                <div className="col-md-4">
                  <strong>$14.95</strong>
                </div>
                <div className="col-md-8">
                  <a
                    type="button"
                    href="shoppingbasket.html"
                    className="btn btn-success float-end"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#shoppingCart"
                    aria-controls="shoppingCart"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 mb-3 mt-2 bg-light rounded border border-primary">
            <h4>A quote from Bethany</h4>
            <p className="mb-0 fst-italic">
              My recipes have been in our family for generations. We hope you
              enjoy our pies! - Bethany
            </p>
          </div>

          <div className="row p-3">
            <div className="table-responsive my-3">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Risk</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apple</td>
                    <td>Yes</td>
                    <td>50%</td>
                  </tr>
                  <tr>
                    <td>Eggs</td>
                    <td>Yes</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>Nuts</td>
                    <td>Maybe</td>
                    <td>&lt;0.1%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="display-5 my-4">Other customers also bought...</h3>

          <div className="row">
            <div className="col-md-3 col-sm-6 mb-3">
              <Link to="/applepie">
                <img className="img-fluid" src={sbp} alt=""></img>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <Link to="/applepie">
                <img className="img-fluid" src={rbps} alt=""></img>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <Link to="/applepie">
                <img className="img-fluid" src={pps} alt=""></img>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <Link to="/applepie">
                <img className="img-fluid" src={cps} alt=""></img>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="offcanvas offcanvas-start shopping-cart-offcanvas"
          data-bs-scroll="true"
          tabindex="-1"
          id="shoppingCart"
          aria-labelledby="shoppingCartLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="shoppingCartLabel">
              Your shopping cart
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Pie name</th>
                    <th>Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Total</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-sm-8 col-md-6">
                      <div className="media">
                        <img
                          className="mr-3 thumbnail img-fluid"
                          width="75"
                          src={pkps}
                          alt="pumpkin pie"
                        ></img>
                        <div className="media-body">
                          <h5 className="mt-0 media-heading text-primary">
                            Pumpkin pie
                          </h5>
                          <span>Status: </span>
                          <span className="text-success">
                            <strong>In Stock</strong>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td
                      className="col-sm-1 col-md-1"
                      style={{ "text-align": "center" }}
                    >
                      <input
                        type="number"
                        className="form-control"
                        value="2"
                      ></input>
                    </td>
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>$14.95</strong>
                    </td>
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>$29.90</strong>
                    </td>
                    <td className="col-sm-1 col-md-1">
                      <button type="button" className="btn btn-danger">
                        X
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="col-sm-8 col-md-6">
                      <div className="media">
                        <img
                          className="mr-3 thumbnail"
                          width="75"
                          src={applepiesmall}
                          alt="apple pie"
                        ></img>
                        <div className="media-body">
                          <h5 className="mt-0 media-heading text-primary">
                            Apple pie
                          </h5>
                          <span>Status: </span>
                          <span className="text-warning">
                            <strong>Last items</strong>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td
                      className="col-sm-1 col-md-1"
                      style={{ "text-align": "center" }}
                    >
                      <input
                        type="number"
                        className="form-control"
                        value="1"
                      ></input>
                    </td>
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>$14.95</strong>
                    </td>
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>$14.95</strong>
                    </td>
                    <td className="col-sm-1 col-md-1">
                      <button type="button" className="btn btn-danger">
                        X
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" className="text-right">
                      <h5>Subtotal</h5>
                    </td>
                    <td className="text-center">
                      <h5>
                        <strong>$44.85</strong>
                      </h5>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="3" className="text-right">
                      <h5>Shipping</h5>
                    </td>
                    <td className="text-center">
                      <h5>
                        <strong>$10.00</strong>
                      </h5>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="3" className="text-right">
                      <h3>Total</h3>
                    </td>
                    <td className="text-center">
                      <h3>
                        <strong>$54.85</strong>
                      </h3>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <form className="m-1">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                ></input>
                <div className="input-group-append">
                  <button type="button" className="btn btn-secondary">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
            <Link type="button" to="/order" className="m-1 btn btn-success">
              Go to order page
            </Link>

            <Link
              type="button"
              to="/"
              className="m-1 btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#cancelModal"
            >
              Clear your shopping cart
            </Link>
          </div>
        </div>

        <div
          className="modal fade"
          id="cancelModal"
          tabindex="-1"
          aria-labelledby="cancelModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Clear basket</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to clear your cart?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger">
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default ApplePieComponent;

import "../App.css";
import { Link } from "react-router-dom";
import bethanysquare from "../assets/images/bethanysquare.jpg";
import CustomNavbarComponent from "./CustomNavbarComponent";

function PieSubscription() {
  return (
    <div>
      <CustomNavbarComponent />
      <main role="main">
        <div class="container-fluid jumbotron jumbotron-other py-5">
          <div class="container">
            <h1 class="display-3 d-none d-md-block text-white">
              Bethany's Pies. Delivered every week.
            </h1>
          </div>
        </div>
        <div class="container">
          <nav class="my-3 ms-3" style={{ "bs-breadcrumb-divider": ">" }}>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <Link to="/#">Pie subscription</Link>
              </li>
            </ol>
          </nav>

          <div class="row p-3 pb-md-4 mx-auto text-start">
            <div class="col-md-8">
              <h1 class="promo-heading fw-normal">
                Now you get our pies with our subscription.{" "}
                <span class="text-muted">Unlimited pie.</span>
              </h1>
              <a
                class="btn btn-sm btn-primary mt-2"
                data-bs-toggle="collapse"
                data-bs-target="#subscriptionInformation"
                role="button"
                aria-expanded="false"
                aria-controls="subscriptionInformation"
              >
                More information
              </a>
              <div class="collapse" id="subscriptionInformation">
                <p class="lead">
                  Marzipan toffee jelly beans lollipop donut. Brownie dessert
                  apple pie pudding gummies tootsie roll tiramisu wafer. Brownie
                  gingerbread chocolate cake chocolate bar brownie. Cake dragée
                  jelly beans pastry donut apple pie.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <img
                src={bethanysquare}
                class="img-fluid"
                alt="Responsive image"
              ></img>
            </div>
          </div>

          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div class="col">
              <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                  <h4 class="my-0 fw-normal">Monthly</h4>
                </div>
                <div class="card-body">
                  <h1 class="card-title pricing-card-title">
                    $50<small class="text-muted fw-light">/month</small>
                  </h1>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>2 pies included</li>
                    <li>Invite to our factory</li>
                    <li>Meet and greet with Bethany</li>
                    <li>Premier support for all pies</li>
                  </ul>
                  <button
                    type="button"
                    class="w-100 btn btn-lg btn-outline-primary"
                  >
                    Subscribe now
                  </button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                  <h4 class="my-0 fw-normal">Weekly</h4>
                </div>
                <div class="card-body">
                  <h1 class="card-title pricing-card-title">
                    $100<small class="text-muted fw-light">/month</small>
                  </h1>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>4 pies included</li>
                    <li>Invite to our factory</li>
                    <li>Meet and greet with Bethany</li>
                    <li>Premier support for all pies</li>
                  </ul>
                  <button type="button" class="w-100 btn btn-lg btn-primary">
                    Subscribe now
                  </button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card mb-4 rounded-3 shadow-sm border-primary">
                <div class="card-header py-3 text-white bg-primary border-primary">
                  <h4 class="my-0 fw-normal">For the family</h4>
                </div>
                <div class="card-body">
                  <h1 class="card-title pricing-card-title">
                    $150<small class="text-muted fw-light">/month</small>
                  </h1>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>6 pies included</li>
                    <li>Invite to our factory</li>
                    <li>Meet and greet with Bethany</li>
                    <li>Premier support for all pies</li>
                  </ul>
                  <button type="button" class="w-100 btn btn-lg btn-primary">
                    Subscribe now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default PieSubscription;

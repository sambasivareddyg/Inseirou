import "../App.css";
import strawpiesmall from "../assets/images/products/strawberrypiesmall.jpg";
import rhusmall from "../assets/images/products/rhubarbpiesmall.jpg";
import applesmall from "../assets/images/products/applepiesmall.jpg";
function ProductsOfTheWeekComponent() {
  return (
    <div className="container history">
      <h2 className="pb-4 mb-2 mt-5">Pies of the week</h2>
      <div className="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-4">
        <div className="col">
          <div className="card rounded mb-4 shadow-sm">
            <img className="card-img-top" src={applesmall} />
            <div className="card-body">
              <h5 className="card-title">Apple pie</h5>
              <p className="card-text">Our famous apple pies!</p>
            </div>
            <div className="card-footer">
              <a href="applepie.html" className="btn btn-primary">
                View details
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card rounded mb-4 shadow-sm">
            <img className="card-img-top" src={rhusmall} />
            <div className="card-body">
              <h5 className="card-title">Rhubarb pie</h5>
              <p className="card-text">My God, so sweet!</p>
            </div>
            <div className="card-footer">
              <a href="applepie.html" className="btn btn-primary">
                View details
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card rounded mb-4 shadow-sm">
            <img className="card-img-top" src={strawpiesmall} />
            <div className="card-body">
              <h5 className="card-title">Strawberry pie</h5>
              <p className="card-text">Our delicious strawberry pie!</p>
            </div>
            <div className="card-footer">
              <a href="applepie.html" className="btn btn-primary">
                View details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductsOfTheWeekComponent;

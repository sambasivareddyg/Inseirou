import "../assets/css/CarouselComponent.css";

function CarouselComponent() {
  return (
    <div
      id="welcomeCarousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#welcomeCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Welcome 1"
        ></button>
        <button
          type="button"
          data-bs-target="#welcomeCarousel"
          data-bs-slide-to="1"
          aria-label="Welcome 2"
        ></button>
        <button
          type="button"
          data-bs-target="#welcomeCarousel"
          data-bs-slide-to="2"
          aria-label="Welcome 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item welcome-carousel-image1 active">
          <div className="carousel-caption">
            <h1>Welcome to Bethany's Pie Shop</h1>
            <p>Home to the best pies on the internet.</p>
          </div>
        </div>
        <div className="carousel-item welcome-carousel-image2">
          <div className="carousel-caption text-start">
            <h1>Discover our pie subscription</h1>
            <p>Our delicious pies delivered to your door. Every week.</p>
            <p>
              <a
                className="btn btn-lg btn-primary"
                href="piesubscription.html"
                role="button"
              >
                Sign up today
              </a>
            </p>
          </div>
        </div>
        <div className="carousel-item welcome-carousel-image3">
          <div className="carousel-caption text-end">
            <h1>Browse the pies of summer.</h1>
            <p>Every season has its pies. Enjoy our summer fruit pies now.</p>
            <p>
              <a
                className="btn btn-lg btn-primary"
                href="fruitpies.html"
                role="button"
              >
                Fruit pies
              </a>
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#welcomeCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#welcomeCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
export default CarouselComponent;

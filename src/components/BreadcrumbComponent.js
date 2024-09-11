import "../App.css";

function BreadcrumbComponent() {
  return (
    <nav aria-label="breadcrumb" className="my-3 ms-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
          Home
        </li>
      </ol>
    </nav>
  );
}
export default BreadcrumbComponent;

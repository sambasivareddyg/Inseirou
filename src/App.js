import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/css/bootstrap-override.css';
import './assets/css/custom.css';
import CustomNavbar from './components/CustomNavbar'
import CarouselComponent from './components/CarouselComponent';
import CounterHook from './hooks/CounterHook';
import BreadcrumbComponent from './components/BreadcrumbComponent'
import HistoryComponent from './components/HistoryComponent';
import ProductsOfTheWeekComponent from './components/ProductsOfTheWeekComponent';

function App() {
  return (
    <div className="App">
        <CustomNavbar/>
          <main className="container" role="main">
          <BreadcrumbComponent/>
          <CarouselComponent/>
          <HistoryComponent/>
          <ProductsOfTheWeekComponent/>
       
    </main>

  
    </div>
  );
}

export default App;

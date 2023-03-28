import "../Styling/App.css"
import {Routes, Route, Link} from "react-router-dom"
import Quotes from "./Quotes";

function App() {
  return (
    <div>
      <div className="quotes-navigation">
        <Link to="/">Home</Link>
        <Link to="/quotes">Quotes</Link>
      </div>

      <Routes>
        <Route exact path="/" />
        <Route exact path="/quotes" element={<Quotes />}/>
      </Routes>

    </div>
  );
}

export default App;

import "../App.css"
import {Routes, Route, Link} from "react-router-dom"
import Quotes from "./Quotes";

function App() {
  return (
    <div>
      {/* <Quotes /> */}
      {/* <Link to="/">Home</Link> */}
      <Link to="/quotes">Quotes Panel</Link>

      <Routes>
        {/* <Route exact path="/" element={<Home/>}/> */}
        <Route exact path="/quotes" element={<Quotes />}/>
      </Routes>

    </div>
  );
}

export default App;

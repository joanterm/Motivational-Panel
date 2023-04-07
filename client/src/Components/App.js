import "../Styling/App.css"
import {Routes, Route, Link} from "react-router-dom"
import Quotes from "./Quotes";
import SignUp from "./SignUp"
import Login from "./Login"

function App() {
  return (
    <div>
      <div className="quotes-navigation">
        <Link to="/">Home</Link>
        <Link to="/quotes">Quotes</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>

      <Routes>
        <Route exact path="/" />
        <Route exact path="/quotes" element={<Quotes />}/>
        <Route exact path="/signup" element={<SignUp />}/>
        <Route exact path="/login" element={<Login />}/>
      </Routes>

    </div>
  );
}

export default App;

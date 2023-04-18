import "../Styling/App.css"
import {Routes, Route} from "react-router-dom"
import Quotes from "./Quotes";
import SignUp from "./SignUp"
import Login from "./Login"
import Navigation from "./Navigation";

function App() {

  return (
    <div>
      <div className="quotes-navigation">
        <Navigation />
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

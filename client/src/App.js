import './App.css';
import {useEffect, useState} from "react"

function App() {
  const [backend, setBackend] = useState([])

  useEffect(() => {
    fetch("/api")
    .then((response) => {  
      return response.json()
    })
    .then((data) => {
      console.log(data)
      setBackend(data.users)
    })
  }, [])

  return (
    <div>
      <h1>Test react</h1>
      {backend.map((e) => <h1>{e}</h1>)}
    </div>
  );
}

export default App;

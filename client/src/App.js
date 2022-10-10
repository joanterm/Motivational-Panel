import './App.css';
import {useEffect, useState} from "react"

function App() {
  const [backend, setBackend] = useState([])

  useEffect(() => {
    fetch("/api")
    .then((response) => {  
      console.log(response)
      return response.json()
    })
    .then((data) => {
      console.log(data)
      setBackend(data)
    })
  }, [])

  return (
    <div>
      <h1>Test react</h1>
      {backend.map((e) => 
      <div>
        <h1>{e.quote}</h1>
        <h2>{e.author}</h2>
      </div>
      )}
    </div>
  );
}

export default App;

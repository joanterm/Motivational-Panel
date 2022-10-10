import './App.css';
import {useEffect, useState} from "react"
import axios from "axios"

function App() {
  const [backend, setBackend] = useState([])
  const [formData, setFormData] = useState({
    quoteText: "",
    authorText: ""
  })

  useEffect(() => {
    axios
    .get("/api")
    .then((data) => {
      console.log(data.data)
      setBackend(data.data)
    })
  }, [])

  const postNewQuote = (newQuote) => {
    axios
    .post("/api", newQuote)
    .then((response) => {
      console.log(response)
      setBackend([
        ...backend,
        response.data
      ])
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postNewQuote({
      quote: formData.quoteText,
      author: formData.authorText
    })
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>Test react</h1>
      {backend.map((e) => 
      <div>
        <h1>{e.quote}</h1>
        <h2>{e.author}</h2>
      </div>
      )}
    <form onSubmit={handleSubmit}>
        <label htmlFor="quoteText">Quote:</label>
        <input 
          type="text"
          name="quoteText"
          value={formData.quoteText}
          onChange={handleChange}
        />
        <label htmlFor="authorText">Author:</label>
        <input 
          type="text"
          name="authorText"
          value={formData.authorText}
          onChange={handleChange}
        />
        <button>Submit</button>
    </form>
    </div>
  );
}

export default App;

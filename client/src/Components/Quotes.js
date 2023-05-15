import '../Styling/App.css';
import {useEffect, useState} from "react"
import { useNavigate, Navigate } from 'react-router-dom'
import axios from "axios"
import QuotesDisplay from './QuotesDisplay';
import QuoteForm from './QuoteForm';
import Login from "./Login"
import Favorites from './Favorites';

const Quotes = () => {
    const [backend, setBackend] = useState([])
    const [formData, setFormData] = useState({
      quoteText: "",
      authorText: ""
    })
    const [quoteId, setQuoteId] = useState()
    const [favoriteQuoteData, setFavoriteQuoteData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {   
      axios
      .create({
        headers: {
          authorization: window.localStorage.getItem("token")
        }
      })
      .get("/api")
      .then((data) => {
        setBackend(data.data)
      })
      .catch((error) => {
        console.log("GET ERROR", error)
      })
    }, [])
  
    const postNewQuote = (newQuote) => {
      axios
      .post("/api", newQuote)
      .then((response) => {
        setBackend([
          ...backend,
          response.data
        ])
      })
      .catch((error) => {
        console.log("POST ERROR", error)
      })
    }
  
    const deleteQuote = (quoteID) => {
      axios    
      .delete(`/api/${quoteID}`)     
      .then(() => {       
        setBackend(backend.filter((backendQuoteId) => { 
          return backendQuoteId.id !== quoteID
        }))
      })
      .catch((error) => {
        console.log("DELETE ERROR", error)
      })
    }
  
    const updateQuote = (quotes) => {        
      const id = quotes.id
      const quote = {
        quote: quotes.quote,
        author: quotes.author
      }
      axios
      .put(`/api/${id}`, quote)
      .then((response) => {
        const mapData = backend.map((item) => {
            if(item.id === response.data.id) {
            return response.data
          } else {
            return item
          }
        })
        setBackend(mapData)
        setQuoteId()      
      })
      .catch((err) => {
        console.log("PUT ERROR", err)
      })
    }
  
    //'UPDATE QUOTE' BUTTON CLICKED -> FILLS IN FORM AREA
    useEffect(() => {
      backend.find((item) => {
          if (item.id === quoteId) {
            setFormData({
              quoteText: item.quote,
              authorText: item.author
            }) 
          }
      })
    }, [quoteId])

    const handleSubmit = (e) => {
      console.log("handle submit", formData)
      e.preventDefault()
      if (quoteId) {
        updateQuote({
          id: quoteId,
          quote: formData.quoteText,
          author: formData.authorText
        })       
      } else {
        postNewQuote({
          quote: formData.quoteText,
          author: formData.authorText
        })
      }
      setFormData({
        quoteText: "",
        authorText: ""
      })
    }
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    const addQuoteToFavorites = (quoteID) => {
      backend.map((item) => {       
        if (item.id === quoteID) {    
          axios
          .post("/favorites", {
            favoriteQuote: item.quote,
            favoriteAuthor: item.author
          })
          .then((response) => {
            console.log("axios favorites post", response.data)
            setFavoriteQuoteData([
              ...favoriteQuoteData,
              response.data
            ])
          })
          navigate("/favorites")
        }
      })
    }

    return (
      <div className="outer-card">
        <div className="inner-card">
          <h1>All my quotes:</h1>
          <QuotesDisplay backend={backend} deleteQuote={deleteQuote} setQuoteId={setQuoteId} addQuoteToFavorites={addQuoteToFavorites}/>
          {!window.localStorage.getItem("token") ? <Navigate to="/login" /> : <QuoteForm handleSubmit={handleSubmit} formData={formData} handleChange={handleChange}/>}
        </div>
      </div>
    );
}
 
export default Quotes;
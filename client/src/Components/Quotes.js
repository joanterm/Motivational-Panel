import '../Styling/App.css';
import {useEffect, useState} from "react"
import { Navigate } from 'react-router-dom'
import axios from "axios"
import QuotesDisplay from './QuotesDisplay';
import QuoteForm from './QuoteForm';
import jwt_decode from 'jsonwebtoken'

const Quotes = () => {
    const [backend, setBackend] = useState([])
    const [formData, setFormData] = useState({
      quoteText: "",
      authorText: ""
    })
    const [quoteId, setQuoteId] = useState()
    const [favoriteQuoteData, setFavoriteQuoteData] = useState([])
    const [favoriteIcons, setFavoriteIcons] = useState([])

    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
  
          if (Date.now() > expirationTime) {
            // Token has expired, clear it from local storage
            localStorage.removeItem('token');
          }
        } catch (error) {
          // Error decoding token, handle accordingly
          console.error('Error decoding token:', error);
        }
      }
    }, []);

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
            favorites_id: item.id,
            favoriteQuote: item.quote,
            favoriteAuthor: item.author
          })
          .then((response) => {
            console.log(response)
            console.log("axios favorites post", response.data)
            setFavoriteQuoteData([
              ...favoriteQuoteData,
              response.data
            ])
            console.log("quoteID", quoteID, "itemid", item.id)
            if (!favoriteIcons.includes(quoteID)) {   
              setFavoriteIcons([
                ...favoriteIcons, 
                quoteID
              ])
            }
          })
        }
      })
    }

    const isFavorite = (quoteID) => {
      return favoriteIcons.includes(quoteID)
    }

    return (
      <div className="outer-card">
        <div className="inner-card">
          <QuotesDisplay 
            backend={backend} 
            deleteQuote={deleteQuote} 
            setQuoteId={setQuoteId} 
            addQuoteToFavorites={addQuoteToFavorites} 
            isFavorite={isFavorite}
            favoriteQuoteData={favoriteQuoteData}
            setFavoriteQuoteData={setFavoriteQuoteData}
            favoriteIcons={favoriteIcons}
            setFavoriteIcons={setFavoriteIcons}
            />
          {!window.localStorage.getItem("token") ? 
          <Navigate to="/login/quotes" /> : 
          <QuoteForm 
            handleSubmit={handleSubmit} 
            formData={formData} 
            handleChange={handleChange}
            />}
        </div>
      </div>
    );
}

export default Quotes;
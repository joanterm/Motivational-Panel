import '../Styling/App.css';
import {useEffect, useState} from "react"
import axios from "axios"
import QuotesDisplay from './QuotesDisplay';
import QuoteForm from './QuoteForm';

const Quotes = () => {
    const [backend, setBackend] = useState([])
    const [formData, setFormData] = useState({
      quoteText: "",
      authorText: ""
    })
    const [quoteId, setQuoteId] = useState()
  
    useEffect(() => {
      axios
      .get("/api")
      .then((data) => {
        setBackend(data.data)
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
        console.log(err)
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
  
    return (
      <div className="quotes-card">
        <div class="quotes-card-inner">
          <QuotesDisplay backend={backend} deleteQuote={deleteQuote} setQuoteId={setQuoteId}/>
          <QuoteForm handleSubmit={handleSubmit} formData={formData} handleChange={handleChange}/>
        </div>
      </div>
    );
}
 
export default Quotes;
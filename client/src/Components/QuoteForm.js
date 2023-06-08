const QuoteForm = (props) => {
  const {
    handleSubmit, 
    formData, 
    handleChange
  } = props
    
    return ( 
        <div>
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
            <button className="submit-button">Submit</button>
        </form>
        </div>
     );
}
 
export default QuoteForm;
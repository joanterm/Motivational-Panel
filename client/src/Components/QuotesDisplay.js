const QuotesDisplay = (props) => {
    const {backend, deleteQuote, setQuoteId} = props
    return (
        <div>
            <h1>Test react</h1>
            {backend.map((data) => 
            <div>
                <h1>{data.quote}</h1>
                <h2>{data.author}</h2>
                <button onClick={() => deleteQuote(data.id)}>DELETE QUOTE</button>
                <button onClick={() => setQuoteId(data.id)}>UPDATE QUOTE</button>
            </div>
            )}
        </div>
     )
}
 
export default QuotesDisplay;
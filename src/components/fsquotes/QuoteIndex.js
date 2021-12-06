import React from 'react'
// import { getAllEpisodes } from '../lib/api'
import QuoteCard from './QuoteCard'
import axios from 'axios'

function QuoteIndex() {
  const [quotes, setQuotes] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://finalspaceapi.com/api/v0/quote')
      console.log(response.data)
      setQuotes(response.data)

    }
    getData()
  }, [])



  return (
    <section className="section">
      <div className="container">
        <div className="column is-multiline">
          {quotes ? (
            quotes.map(quote => (
              <QuoteCard
                key={quote.id}
                name={quote.character}
                image={quote.image}
                quote={quote.quote}
                quoteId={quote.id}


              />
            ))
          ) : (
            <p>...loading</p>
          )}
        </div>

      </div>
    </section>
  )
}

export default QuoteIndex
import React from 'react'
import { Link } from 'react-router-dom'

function QuoteCard({ quoteId, name, image, quote }) {
  return (
    <div className="column is one-quarter-desktop is one-third-tablet">
      <Link to={`/quote/${quoteId}`}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-header-title">{quote}</h3>
          </div>
        </div>
        <div className="card-image">
          <figure className="image image-is-1by1">
            <img src={image} alt={name} />
          </figure>
        </div>
        <div className="card-content">
          <h5>{name}</h5>
        </div>
        
      </Link>
    </div>
  )
}

export default QuoteCard
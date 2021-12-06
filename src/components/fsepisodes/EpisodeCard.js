import React from 'react'
import { Link } from 'react-router-dom'

function EpisodeCard({ episodeId, name, image, director, writer }) {
  return (
    <div className="column is one-quarter-desktop is one-third-tablet">
      <Link to={`/episode/${episodeId}`}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-header-title">{name}</h3>
          </div>
        </div>
        <div className="card-image">
          <figure className="image image-is-1by1">
            <img src={image} alt={name} />
          </figure>
        </div>
        <div className="card-content">
          <h5>Writer: {writer}</h5>
          <h5>Director: {director}</h5>
        </div>
        
      </Link>
    </div>
  )
}

export default EpisodeCard
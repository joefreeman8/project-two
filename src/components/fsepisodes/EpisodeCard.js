import React from 'react'
import { episode } from '../../lib/episode.js'


function EpisodeCard({ episodeId, name, image, director, writer }) {

  return (
    <div className="column is one-quarter-desktop is one-third-tablet">
      <div className="card">
        <div className="card-header">
          <h3 className="card-header-title">{name}</h3>
        </div>
      </div>
      <div className="card-image">
        <figure className="image image-is-1by1">
          <a href={episode[episodeId]} target="_blank" rel="noreferrer"><img src={image} alt={name} /></a>
        </figure>
      </div>
      <div className="main-cards">
        <h5 className="episode-writer">Writer: {writer}</h5>
        <h5 className="episode-director">Director: {director}</h5>
      </div>
    </div>
  )

}

export default EpisodeCard
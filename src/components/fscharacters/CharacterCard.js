import React from 'react'
import { Link } from 'react-router-dom'

function CharacterCard({ characterId, name, origin, image }) {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/character/${characterId}`}>
        <div className="card" >
          <div className="card-header">
            <h3 className="card-header-title">{name}</h3>
          </div>
          <div className="card-image">
            <figure className="image image-is-1by1">
              <img src={image} alt={name} />
            </figure>
          </div>
          <div className="main-cards">
            <h4 className="card-header-title">{origin}</h4>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CharacterCard
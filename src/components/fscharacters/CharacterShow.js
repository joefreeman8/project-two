import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { createNotification } from '../lib/notification'

function CharacterShow() {
  const [character, setCharacter] = React.useState(null)
  const { characterId } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const characterRes = await axios.get(`https://finalspaceapi.com/api/v0/character/${characterId}`)
        setCharacter(characterRes.data)
        const quoteRes = await axios.get('https://finalspaceapi.com/api/v0/quote')
        const quotesArray = quoteRes.data.filter(quote => {
          if (quote.by === characterRes.data.name) {
            return quote
          }
        })
        createNotification(quotesArray[Math.floor(Math.random() * quotesArray.length)].quote)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [characterId])



  return (
    <section className="section">
      <div className="container">
        {character ?
          <div>
            <h2 className="title has-text-centered">{character.name}</h2>
            <hr />
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <img src={character.img_url} alt={character.name} />
                </figure>
              </div>
              <div className="column is-half">
                <h4 className="title is-4">
                  <span role="img" aria-label="globe">
                    🌍
                  </span>{' '}
                  Origin
                </h4>
                <p>{character.origin}</p>
                <hr />
                <h4 className="title is-4">
                  <span role="img" aria-label="alien">
                    👽
                  </span>{' '}
                  Species
                </h4>
                <p>{character.species}</p>
                <hr />
                <h4 className="title is-4">
                  <span role="img" aria-label="lightning">
                    ⚡︎
                  </span>{' '}
                  Abilities
                </h4>
                <p>{character.abilities[Math.floor(Math.random() * character.abilities.length)]}</p>
                <hr />
                <h4 className="title is-4">
                  <span role="img" aria-label="alias">
                    @
                  </span>{' '}
                  Alias
                </h4>
                <p>{character.alias[Math.floor(Math.random() * character.alias.length)]}</p>
              </div>
            </div>
            <hr />
          </div>
          :
          <p>...is loading</p>
        }
      </div>
    </section >
  )
}

export default CharacterShow
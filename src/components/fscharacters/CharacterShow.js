import React from 'react'
import { useParams } from 'react-router'
import { createNotification } from '../../lib/notification.js'
import { getAllQuotes, getSingleCharacter } from '../../lib/api.js'
// import Error from '../common/Error'
import Loading from '../common/Loading'


function CharacterShow() {
  const [character, setCharacter] = React.useState(null)
  const { characterId } = useParams()
  const [isError, setIsError] = React.useState(false)
  const isLoading = !character && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const characterRes = await getSingleCharacter(characterId)
        setCharacter(characterRes.data)
        const quoteRes = await getAllQuotes()
        const quotesArray = quoteRes.data.filter(quote => {
          if (quote.by === characterRes.data.name) {
            return quote
          }
        })
        createNotification(quotesArray[Math.floor(Math.random() * quotesArray.length)].quote)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [characterId])



  return (
    <section className="section">
      <div className="columns">
        <div className="wholecard column is-half is-offset-one-quarter">
          <div className="container">
            {/* {isError && <Error />} */}
            {isLoading && <Loading />}
            {character &&
              <div className="card-info">
                <div className="character-name">
                  <h2 className="title has-text-centered">{character.name}</h2>
                  <hr />
                </div>
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
                  </div>
                </div>
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
                <hr />
              </div>
            }
          </div>
        </div>
      </div>
    </section >
  )
}

export default CharacterShow
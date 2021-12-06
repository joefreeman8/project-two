import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

function CharacterShow() {
  const [character, setCharacter] = React.useState(null)
  const { characterId } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`https://finalspaceapi.com/api/v0/character/${characterId}`)
      setCharacter(res.data)
    }
    getData()
  }, [characterId])

  console.log(character)

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
            <p>hello</p>
          </div>
          :
          <p>...is loading</p>
        }
      </div>
    </section >
  )
}

export default CharacterShow
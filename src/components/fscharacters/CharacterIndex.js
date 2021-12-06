import React from 'react'
// import { getAllCharacters } from '../lib/api'
import axios from 'axios'
import CharacterCard from './CharacterCard'

function CharacterIndex() {
  const [characters, setCharacters] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://finalspaceapi.com/api/v0/character')
        setCharacters(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])


  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {characters ?
            characters.map(character => (
              <CharacterCard
                key={character.id}
                name={character.name}
                gender={character.gender}
                origin={character.origin}
                image={character.img_url}
                alias={character.alias}
                abilities={character.abilities}
                characterId={character.id}
              />
            ))
            :
            <p>...is loading</p>
          }
        </div>
      </div>
    </section>
  )
}

export default CharacterIndex
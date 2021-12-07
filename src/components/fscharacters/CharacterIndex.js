import React from 'react'
// import { getAllCharacters } from '../lib/api'
import axios from 'axios'
import CharacterCard from './CharacterCard'


function CharacterIndex() {

  const [characters, setCharacters] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')

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

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filterCharacters = (characters) => {
    return characters.filter(character => {
      return character.name.toLowerCase().includes(searchValue.toLowerCase())
    })
  }


  return (
    <section className="section">
      <div className="columns">
        <div className="column is-one-third">
          <input className="field input is-normal" 
            placeholder="Search..." 
            onChange={handleSearch} 
          />
        </div>
      </div>

      <div className="container">
        <div className="columns is-multiline">
          {characters ?
            filterCharacters(characters).map(character => (
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
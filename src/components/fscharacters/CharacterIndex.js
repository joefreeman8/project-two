import React from 'react'
import CharacterCard from './CharacterCard'
import { getAllCharacters } from '../../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'


function CharacterIndex() {

  const [characters, setCharacters] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !characters && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllCharacters()
        setCharacters(res.data)
      } catch (err) {
        setIsError(true)
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
          {isError && <Error />}
          {isLoading && <Loading />}
          {characters &&
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
            ))}
        </div>
      </div>
    </section>
  )
}

export default CharacterIndex
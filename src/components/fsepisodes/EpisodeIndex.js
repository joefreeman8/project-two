import React from 'react'
import EpisodeCard from './EpisodeCard'
import { getAllEpisodes } from '../../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'


function EpisodeIndex() {
  const [episodes, setEpisodes] = React.useState(null)
  const [selectedSeason, setSelectedSeason] = React.useState('all')
  const [isError, setIsError] = React.useState(false)
  const isLoading = !episodes && !isError


  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllEpisodes()
        setEpisodes(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])



  const handleSelect = (e) => {
    setSelectedSeason(e.target.value)
  }

  const filteredEpisodes = (episodes) => {
    return episodes.filter(episode => {
      return episode.air_date.includes(selectedSeason) || selectedSeason === 'all'
    })
  }

  return (
    <section className="section">
      <h1 className="watch-episode title is-1 has-text-centered">Watch an episode!</h1>
      <div className="container">
        <div className="field select is-medium is-info">
          <select onChange={handleSelect}>
            <option value="all">All Seasons</option>
            <option value="2018">Season One</option>
            <option value="2019">Season Two</option>
          </select>
        </div>
        <div className="column is-multiline">
          {isError && <Error />}
          {isLoading && <Loading />}
          {episodes && 
            filteredEpisodes(episodes).map(episode => (
              <EpisodeCard
                key={episode.id}
                name={episode.name}
                image={episode.img_url}
                writer={episode.writer}
                director={episode.director}
                episodeId={episode.id}

              />
            ))}
        </div>

      </div>
    </section>
  )
}

export default EpisodeIndex
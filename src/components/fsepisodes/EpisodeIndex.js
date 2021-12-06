import React from 'react'
// import { getAllEpisodes } from '../lib/api'
import EpisodeCard from './EpisodeCard'
import axios from 'axios'

function EpisodeIndex() {
  const [episodes, setEpisodes] = React.useState(null)
  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://finalspaceapi.com/api/v0/episode')
      console.log(response.data)
      setEpisodes(response.data)

    }
    getData()
  }, [])

  console.log(episodes)

  return (
    <section className="section">
      <div className="container">
        <div className="column is-multiline">
          {episodes ? (
            episodes.map(episode => (
              <EpisodeCard
                key={episode.id}
                name={episode.name}
                image={episode.img_url}
                writer={episode.writer}
                director={episode.director}

              />
            ))
          ) : (
            <p>...loading</p>
          )}
        </div>

      </div>
    </section>
  )
}

export default EpisodeIndex
import axios from 'axios'

const baseUrl = 'https://finalspaceapi.com/api/v0'

export function getAllCharacters () {
  return axios.get(`${baseUrl}/character`)
}

export function getSingleCharacter (characterId) {
  return axios.get(`${baseUrl}/character/${characterId}`)
}


export function getAllQuotes () {
  return axios.get(`${baseUrl}/quote`)
}

export function getAllEpisodes () {
  return axios.get(`${baseUrl}/episode`)
}


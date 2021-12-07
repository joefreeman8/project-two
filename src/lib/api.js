import Axios from 'axios'

const baseUrl = 'https://finalspaceapi.com/api/v0'

export function getAllCharacters () {
  return Axios.get(`${baseUrl}/character`)
}

export function getSingleCharacter () {
  return Axios.get(`${baseUrl}/character/id`)
}

export function getAllEpisodes () {
  return Axios.get(`${baseUrl}/episode`)
}
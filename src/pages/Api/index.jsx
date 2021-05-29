import axios from 'axios'

const fetchNews = (query) => {
  if (!query) {
    return Promise.reject('Query should be Provided')
  }

  return axios.get('https://swapi.dev/api/people/')
}

export default fetchNews

import axios from 'axios'

function authHeaders() {
  let user = localStorage.getItem('user')
  if (user && user.jwt) {
    return {'Authorization' : 'Bearer ' + user.jwt}
  }
  return {}
}

function login(user) {
  return axios.post('/api/login', user)
  .then(handleResponse)
  .then( user => {
    localStorage.setItem('user')
    return user
  })
}

function register(user) {
  return axios.post('/api/register', user)
  .then(handleResponse).then(
    user => {
      localStorage.setItem('user')
      return user
    }
  )
}

function handleResponse(resp) {
  return new Promise ((resolve, reject) => {
    let data = resp.data
    if (data.jwt)
      resolve(data)
    else if (data.error)
      reject(new Error(data.error))
    else
      reject(new Error(data))
  })
}

function getLeaderBoards() {
  return axios.get('/api/leaderboards', {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders()
    }
  }).then(handleResponse)
}

export {
  login,
  register,
  authHeaders,
  getLeaderBoards,
}

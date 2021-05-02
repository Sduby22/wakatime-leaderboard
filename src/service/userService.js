import axios from 'axios'

const simple = 1

function authHeaders() {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user && user.jwt) {
    return { 'Authorization': 'Bearer ' + user.jwt }
  }
  return {}
}

function login(user) {
  return axios.post('/api/login', user)
    .then(handleResponse)
    .then(resp => {
      let user = resp.user
      localStorage.setItem('user', JSON.stringify(user))
      return user
    })
}

function register(user) {
  return axios.post('/api/register', user)
    .then(handleResponse).then(
      resp => {
        let user = resp.user
        localStorage.setItem('user', JSON.stringify(user))
        return user
      }
    )
}

function handleResponse(resp) {
  return new Promise((resolve, reject) => {
    let data = resp.data
    if (data.success)
      resolve(data)
    else if (data)
      reject(new Error(data.msg))
  })
}

function profile() {
  return axios.get('/api/profile', {
    headers: authHeaders()
  })
}

function editProfile(profile) {
  return axios.post('/api/edit_profile', profile, {
    headers: authHeaders()
  })
}

function secHumanify(sec, simple = 0) {
  let hr = Math.floor(sec / 3600)
  let min = Math.floor(sec / 60)
  let remainder = min - hr * 60
  let res = ''
  if (!simple) {
    res = hr > 0 ? `${hr} hrs ` : ''
    res += `${remainder} mins`
  } else {
    res = hr > 0 ? `${hr}h` : ''
    res += `${remainder}m`
  }
  return res
}

function getLeaderBoards() {
  return axios.get('/api/leaderboards', {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders()
    }
  }).then(resp => {
    let data = resp.data
    data.sort((a, b) => { return b.TOTAL - a.TOTAL })
    for (let x in data) {
      data[x].TOTAL = secHumanify(data[x].TOTAL, simple)
      data[x].AVG = secHumanify(data[x].AVG, simple)
    }
    return data
  })
}

export {
  login,
  register,
  authHeaders,
  getLeaderBoards,
  profile,
  editProfile,
}

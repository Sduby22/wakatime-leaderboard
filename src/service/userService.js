import axios from 'axios'

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

function secHumanify(sec) {
  let hr = Math.round(sec/3600)
  let min = Math.round(sec/60)
  let remainder = min - hr*60
  let res = hr > 0 ? `${hr} hrs ` : ''
  res += `${remainder} mins`
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
      data.sort((a,b) => {return b.TOTAL - a.TOTAL})
      for (let x in data) {
        data[x].TOTAL = secHumanify(data[x].TOTAL)
        data[x].AVG = secHumanify(data[x].AVG)
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

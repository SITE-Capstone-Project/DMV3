const apiBaseURL = "http://localhost:3001"
const apiLogInURL = "/auth/login"
const apiRegisterURL = "/auth/register"

class ApiError extends Error {
  constructor(message, details) {
    super(message)
    this.name = 'API' + this.name
    this.details = details
  }
}

let headers = ({
  'Content-Type': 'application/json',
  'authorization': localStorage.getItem("exploreio-token")
})

const request = async (method, url, body = null) => {
  const options = body ? { method, headers, body: JSON.stringify(body) } : { method, headers }

  let response = null

  try {
    response = await fetch(url, options)
  }
  catch(e) {
    throw new ApiError('API cannot be reached', e.message)
  }

  const data = await response.json()

  if (response.ok) {
    return data
  }
  else {
    if (data.error)
      throw new ApiError(data.error.message, data.error.details)
  }
}

const register = async function(body) {
  try {
    const response = await request('POST', `${apiBaseURL}${apiRegisterURL}`, body)
    return response
  } catch(error) {
    return null
  }
}

const logIn = async function(body) {
  try {
    const response = await request('POST', `${apiBaseURL}${apiLogInURL}`, body)
    return response
  } catch(error) {
    return null
  }
}

const getDestinations = async function() {
  try {
    const response = await request('GET', `${apiBaseURL}/exploreio/destinations`)
    return response
  } catch (error) {
    return null
  }
}

const getDestination = async function(id) {
  try {
    const response = await request('GET', `${apiBaseURL}/exploreio/destinations/${id}`)
    return response
  } catch (error) {
    return null
  }
}

const getFlight = async function(flight) {
  try {
    const response = await request('POST',`${apiBaseURL}/exploreio/flights`, flight)
    return response
  } catch(error) {
    return null
  } 
}

const getUser = async function() {
  try {
    const response = await request('GET',`${apiBaseURL}/auth/me`)
    return response
  } catch(error) {
    return null
  }
}

const addFavorites = async function(body) {
  try {
    const response = await request('POST', `${apiBaseURL}/exploreio/favorites`, body)
    return response
  } catch(error) {
    return null
  }
}

const deleteFavorites = async function(body) {
  try {
    const response = await request('DELETE', `${apiBaseURL}/exploreio/favorites`, body)
    return response
  } catch(error) {
    return null
  }  
}

const getFavorites = async function() {
  try {
    const response = await request('GET', `${apiBaseURL}/exploreio/favorites`)
    return response
  } catch(error) {
    return null
  }
}

const canFavorite = async function(body) {
  try {
    const response = await request('POST', `${apiBaseURL}/exploreio/favorites/check`, body)
    return response
  } catch(error) {
    return null
  }  
}

const addActivity = async function(body) {
  try {
    const response = await request('POST', `${apiBaseURL}/exploreio/activities`, body)
    return response
  } catch(error) {
    return null
  }
}

const deleteActivity = async function(body) {
  try {
    const response = await request('DELETE', `${apiBaseURL}/exploreio/activities`, body)
    return response
  } catch(error) {
    return null
  }
}

const fixToken = function (token) {
  const fixedToken = "Bearer " + token
  return fixedToken
}

export {
  ApiError,
  request,
  apiBaseURL,
  apiLogInURL,
  apiRegisterURL,
  fixToken,
  logIn,
  register,
  getFlight,
  getUser,
  getDestinations,
  getDestination,
  addFavorites,
  deleteFavorites,
  getFavorites,
  canFavorite,
  addActivity,
  deleteActivity
}
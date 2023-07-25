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
    // 'authorization': localStorage.getItem('')
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

const getFlight = async function(flight) {
  try {
    const response = await request('POST',`${apiBaseURL}/exploreio/flights`, flight)
    return response
  } catch(error) {
    return error
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
    getFlight,
    getUser,
}
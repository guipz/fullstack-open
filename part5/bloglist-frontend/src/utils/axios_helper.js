
const errorWrapper = async (request) => {
  try {
    const response = await request()
    return response.data
  } catch ({ response: { data, status } }) {
    throw { message: data && data.error ? data.error : 'Unknown Error', status }
  }
}

export default {
  errorWrapper
}
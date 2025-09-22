import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getData = promise => promise.then(response => response.data)

const getAll = () => {
    const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }

  return getData(axios.get(baseUrl)).then(data => data.concat(nonExisting))
}
    

const create = newObject => 
    getData(axios.post(baseUrl, newObject))

const update = (id, newObject) =>
    getData(axios.put(`${baseUrl}/${id}`, newObject))

export default { getAll, create, update }
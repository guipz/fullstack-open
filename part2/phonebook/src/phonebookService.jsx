import axios from 'axios'

const baseUrl = "/api/persons" 
const unknownError = "Unknown error"

function addPerson(person) {
    return promisePostProcessing(axios.post(baseUrl, person))
}

function updatePerson(person) {
    return promisePostProcessing(axios.put(`${baseUrl}\\${person.id}`, person))
}

function getPersons() {
    return promisePostProcessing(axios.get(baseUrl))
}

function deletePerson(person) {
    return promisePostProcessing(axios.delete(`${baseUrl}\\${person.id}`))
}

function promisePostProcessing(p) {
    return p.then(r => r.data).catch((p) => { 
        throw ({ message: p.response.data.error? p.response.data.error: unknownError, status: p.response.status })
    })
}


export default {
    addPerson,
    updatePerson,
    getPersons,
    deletePerson
}
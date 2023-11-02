import axios from 'axios'

const baseUrl = "/api/persons" 

function addPerson(person) {
    return axios.post(baseUrl, person)
        .then((r) => r.data)
}

function updatePerson(person) {
    return axios.put(`${baseUrl}\\${person.id}`, person)
        .then((r) => r.data)
}

function getPersons() {
    return axios.get(baseUrl)
        .then((r) => r.data)
}

function deletePerson(person) {
    return axios.delete(`${baseUrl}\\${person.id}`)
        .then((r) => r.data)
}


export default {
    addPerson,
    updatePerson,
    getPersons,
    deletePerson
}
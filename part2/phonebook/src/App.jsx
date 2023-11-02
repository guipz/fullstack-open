import { useState, useEffect } from 'react'
import phonebookService from './phonebookService'
import './App.css'

function App() {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null) 

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleFilteredNameChange = (e) => setFilteredName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const addPerson = (name, number) => phonebookService.addPerson({ name: name, number: number }).then((r) => {
      setPersons(persons.concat(r))
      showSuccessPrompt(`Added ${r.name}`)
    });
  const updatePerson = (person) => {phonebookService.updatePerson(person).then((r) => {
      setPersons(persons.map(p => r.id !== p.id ? p : r))
      showSuccessPrompt(`Updated ${r.name}`)
  })}
  const isPersonRegistered = (name) => persons.filter((p) => p.name === name).length !== 0
  const isNameValid = (name) => name.length !== 0
  const isNumberValid = (number) => number.length !== 0 && number.match(/^[0-9|\-|\(|\)|+|\s]*$/)
  const getFilteredPersons = () => isFilteredNameValid() ? persons.filter((p) => p.name.toUpperCase().includes(filteredName.toUpperCase())) : persons
  const isFilteredNameValid = () => filteredName.trim().length != 0
  const showConfirmDeletePrompt = (name) => window.confirm(`Do you really want to delete ${name}?`)
  const updateConfirmPrompt = (name) => confirm(`${name} is already added to phonebook. Do you want to update the number?`)
  const showSuccessPrompt = (text) => {
    setSuccessMessage(text)
    setTimeout(() => setSuccessMessage(null), 5000)
  }
  const showErrorPrompt = (text) => {
    setErrorMessage(text)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const deletePerson = (person) => {
    if (showConfirmDeletePrompt(person.name))
      phonebookService.deletePerson(person).then(() => {
        setPersons(persons.filter(p => person.id !== p.id))
        showSuccessPrompt(`Removed ${person.name}`)
      }).catch( error => {
        showErrorPrompt(`${person.name} was already removed.`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    addPersonIfValid(newName.trim(), newNumber.trim())
  }

  const addPersonIfValid = (newName, newNumber) => {
    if (isNameValid(newName) && isNumberValid(newNumber))
      if (isPersonRegistered(newName))
        updateConfirmPrompt(newName) ? updatePerson({ ...persons.find(p => p.name === newName), number: newNumber }) : {}
      else
        addPerson(newName, newNumber)
    else
      alert('Invalid name or number. Try again.')
  }

  useEffect(() => { phonebookService.getPersons().then((p) => setPersons(p)) }, [])

  return (
    <div>
      <Header text='Phonebook' />
      <Notification text={errorMessage} type="error"/>
      <Notification text={successMessage} type="success"/>
      <NewPersonForm
        newName={newName} handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <Persons persons={getFilteredPersons()} filteredName={filteredName} handleFilteredNameChange={handleFilteredNameChange} handleDelete={deletePerson} />
    </div>
  )
}

function Notification({ text, type }) {
  return text? <div className={type}>{text}</div>: null
}

function NewPersonForm({ newName, handleFormSubmit, handleNameChange, number, handleNumberChange }) {
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <InputWithPlaceHolder value={newName} handleValueChange={handleNameChange} placeholder='Person name' />
        <br />
        <InputWithPlaceHolder value={number} handleValueChange={handleNumberChange} placeholder='Person number' />
        <p>
          <button type='submit'>Add</button>
        </p>
      </form>
    </>
  )
}

function InputWithPlaceHolder({ value, handleValueChange, placeholder }) {
  return <input value={value} onChange={handleValueChange} placeholder={placeholder} />
}

function Persons({ persons, filteredName, handleFilteredNameChange, handleDelete }) {
  return (
    <>
      <Header text='Persons' />
      <InputWithPlaceHolder value={filteredName} handleValueChange={handleFilteredNameChange} placeholder='Search name' />
      {persons.map((p) => <Person key={p.id} person={p} handleDelete={handleDelete} />)}
    </>
  )
}

function Header({ text }) {
  return <h2>{text}</h2>
}

function Person({ person, handleDelete }) {
  return <p>Name: {person.name} | Number: {person.number} <button onClick={() => handleDelete(person)}>Delete</button></p>
}

export default App

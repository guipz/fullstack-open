

const getLoggedUserObject = () => JSON.parse(localStorage.getItem('loggedUser'))


Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
  })
})

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
    username, password, name
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/blogs`,
    body: { title, author, url },
    auth: {
      bearer: getLoggedUserObject().token
    }
  })
})
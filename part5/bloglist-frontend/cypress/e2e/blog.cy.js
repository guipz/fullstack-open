

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({ username:'Bob', name:'Bob William', password:'345123' })
    cy.createUser({ username:'John', name:'John James', password:'1234' })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login to Application')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
    cy.get('#login-password')
    cy.get('#login-username')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-password').type('345123')
      cy.get('#login-username').type('Bob')
      cy.get('#login-button').click()
      cy.contains('Bob logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-password').type('123')
      cy.get('#login-username').type('Bob')
      cy.get('#login-button').click()
      cy.contains('Bob logged in').should('not.exist')
      cy.get('.error')
        .and('have.css', 'background-color', 'rgb(255, 0, 0)')
        .and('contain', 'Incorrect Password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Bob', password:'345123' })
      cy.visit('')
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()

      cy.get('#newblog-title').type('Tutorial')
      cy.get('#newblog-author').type('Bob')
      cy.get('#newblog-url').type('www.example.com')
      cy.get('#newblog-button').click()

      cy.contains('Tutorial')
    })

    describe('A blog exists', function () {
      beforeEach(function() {
        cy.createBlog({ title: 'Tutorial', author: 'Bob', url: 'www.example.com' })
        cy.visit('')
      })

      it('blog can be liked', function () {
        cy.contains('Tutorial').contains('View').click()
        cy.contains('Like').click()
        cy.contains('Likes 1')
      })

      it('blog can be deleted if creator', function () {
        cy.contains('Tutorial').contains('View').click()
        cy.contains('Delete').click()
        cy.contains('Tutorial').should('not.exist')
      })

      it('blog can not be deleted if not creator', function () {
        cy.login({ username: 'John', password:'1234' })
        cy.visit('')
        cy.contains('Tutorial').contains('View').click()
        cy.contains('Delete').should('not.exist')
      })

    })

    describe('Multiple blogs exists', function () {
      beforeEach(function() {
        cy.createBlog({ title: 'Tutorial', author: 'Bob', url: 'www.example.com' })
        cy.createBlog({ title: 'Guides', author: 'Robert', url: 'www.example.com' })
        cy.createBlog({ title: 'Investments', author: 'Martin', url: 'www.example.com' })
        cy.visit('')
      })

      it.only('blogs are ordered by likes', function() {
        cy.contains('Tutorial').parent().as('blog-n0').contains('View').click()
        cy.contains('Guides').parent().as('blog-n1').contains('View').click()
        cy.contains('Investments').parent().as('blog-n2').contains('View').click()

        cy.get('@blog-n0').contains('Like').as('like-n0')
        cy.get('@blog-n1').contains('Like').as('like-n1')
        cy.get('@blog-n2').contains('Like').as('like-n2')

        cy.get('@like-n2').click().wait(50)
        cy.get('@like-n1').click().wait(50)
        cy.get('@like-n2').click().wait(50)
        cy.get('@like-n1').click().wait(50)
        cy.get('@like-n2').click().wait(50)
        cy.get('@like-n0').click().wait(50)

        cy.get('.blog-item').eq(0).contains('Investments')
        cy.get('.blog-item').eq(1).contains('Guides')
        cy.get('.blog-item').eq(2).contains('Tutorial')

      })
    })
  })

})


describe('Navigation', () => {
  it('should navigate home', () => {
    cy.visit('http://localhost:3000/profile')
    cy.get('h1').should('contain', 'Notepad')

    cy.get('#homeLink').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})

describe('Authentication', () => {
  it('should navigate user to Github OAuth', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#loginButton').click()
    cy.url().should('include', 'github.com')
  })

  it('should sign the user in', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#loginButton').click()
    cy.url().should('include', 'github.com')

    cy.get('button[type="submit"]').click()
    cy.url().sho
  })
})
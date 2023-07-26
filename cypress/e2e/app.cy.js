
describe('Navigation', () => {
  it('should navigate home', () => {
    cy.visit('http://localhost:3000/profile')
    cy.get('h1').should('contain', 'Notepad')

    cy.get('#homeLink').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})

describe('Authentication', () => {
  // it('should navigate user to Github OAuth', () => {
  //   cy.visit('http://localhost:3000/')
  //   cy.get('#loginButton').click()
  //   cy.url().should('include', 'api/auth/signin')
  // })

  it('should sign the user in', () => {
    const username = Cypress.env('GITHUB_TEST_USER')
    const password = Cypress.env('GITHUB_TEST_PW')
    const loginUrl = Cypress.env('SITE_NAME')
    const cookieName = Cypress.env('COOKIE_NAME')

    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      isPopup: true,
      loginSelector: `button[id="loginButton"]`,
      postLoginSelector: `ul[id="feed"]`
    }

    return cy
      .task("GithubSocialLogin", socialLoginOptions)
      .then(({ cookies }) => {
        cy.clearCookies()

        const cookie = cookies
          .filter(cookie => cookie.name === cookieName)
          .pop()
          
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure
          })

          // cy.visit('api/auth/signout')
          // cy.get("form").submit()
        }
      })
  })

  it('should navigate user to New Note', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#newNoteLink').click()
  })

  it('should create a new note', () => {
    cy.get('#title').type('Test Note')
    cy.get('#content').type('This is a test note.')
    cy.get('#saveButton').click()
    cy.visit('http://localhost:3000/profile')
    cy.get("button[id='draftsTab']").click()
    cy.contains('Test Note')
  })





  it('should sign the user out', () => {
    cy.visit('api/auth/signout')
    cy.get("form").submit()
  })
})
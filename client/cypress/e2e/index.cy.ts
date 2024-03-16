describe('Index test', () => {
  it('Reads header on home page', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="cypress-title"]').should("exist")
      .should("have.text", "Bondify")
  })
  it('Reads header on allProfiles page', () => {
    cy.visit('http://localhost:5173/allProfiles');

    cy.get('[data-testid="allProfiles-header"]').should("exist")
      .should("have.text", "All profiles")
  })
})
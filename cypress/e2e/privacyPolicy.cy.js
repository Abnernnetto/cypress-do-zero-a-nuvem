Cypress._.times(3, () => {
  it('Check the privacy policy page independently', () => {
    cy.visit('./src/privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
    cy.contains('p', 'Talking About Testing')
      .should('be.visible')
  })


})
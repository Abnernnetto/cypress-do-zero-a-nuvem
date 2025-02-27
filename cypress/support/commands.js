Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Alamoah',
    lastName: 'Sucrilhos',
    email: 'alamoahsucrilhos@email.com',
    text: 'testando alomoah sucrilhos'


}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()

})
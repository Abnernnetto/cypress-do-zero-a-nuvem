

beforeEach(function () {
  cy.visit('./src/index.html')
});


describe('Customer Service Center TAT', () => {

  it('Check the application title', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  });

  it('Checks the success message', () => {

    cy.clock()

    cy.get('#firstName').type('Abner')
    cy.get('#lastName').type('Nunes')
    cy.get('#email').type('abn_net@hotmail.com')
    cy.get('#open-text-area').type('Ajudando', { delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  });

  it('Checks the error message when submitting the form with an invalid email format', () => {
    
    cy.clock()
    
    cy.get('#firstName').type('Adrian')
    cy.get('#lastName').type('Netto')
    cy.get('#email').type('abn_nethotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  });

  it('Checks that if a non-numeric value is typed, the field remains empty', () => {
    cy.get('#phone')
     .type('abcde')
     .should('have.value', '')
  });

  it('Checks the error message when the phone becomes mandatory but is not filled before form submission', () => {
    
    cy.clock()
    
    cy.get('#firstName').type('Miriã')
    cy.get('#lastName').type('Netto')
    cy.get('#email').type('miria@hotmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')

    cy.tick(3000)

    cy.get('.error > strong').should('not.be.visible')

  });

  it('Fills and clears the fields: first name, last name, email, and phone', () => {
    cy.get('#firstName')
     .type('Abner')
     .should('have.value', 'Abner')
     .clear()
     .should('have.value', '')

     cy.get('#lastName')
     .type('Nunes')
     .should('have.value', 'Nunes')
     .clear()
     .should('have.value', '')

     cy.get('#email')
     .type('abn_net@hotmail.com')
     .should('have.value', 'abn_net@hotmail.com')
     .clear()
     .should('have.value', '')

     cy.get('#phone')
     .type('985081818')
     .should('have.value', '985081818')
     .clear()
     .should('have.value', '')
  });

  it('Displays an error message when submitting the form without filling mandatory fields', () => {

    cy.contains('button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')

 
  });

  it('Successfully submits the form using a default custom command without passing data', () => {
    const data = {
      firstName: 'Abner',
      lastName: 'Nunes Netto',
      email: 'abn_net@uol.com.br',
      text: 'Testando'
    }

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

 
  });

  it('Successfully submits the form using an editable custom command with data', () => {
    const data = {
      firstName: 'Abner',
      lastName: 'Nunes Netto',
      email: 'abn_net@uol.com.br',
      text: 'Testando'
    }

    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')

 
  });

  it('Selects a YouTube product by its text', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    cy.contains('button', 'Enviar').click()
    
  })

  it('Selects a Mentoring product by its text', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
    cy.contains('button', 'Enviar').click()
  })

  it('Selects a Blog product by its text', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    cy.contains('button', 'Enviar').click()
  })

  it('Checks the "Feedback" service type', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')

    cy.contains('button', 'Enviar').click()

  })

  it('Checks each type of service', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
      .should('be.checked')

  })

  it('Checks both checkboxes and then unchecks the last one', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

  })

  it('Displays an error message when the phone becomes mandatory but is not filled before form submission', () => {

   
    cy.get('#firstName').type('Adrian')
    cy.get('#lastName').type('Nunes')
    cy.get('#email').type('adrian@hotmail.com')
    cy.get('#open-text-area').type('testando')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    

  })

  it('Selects a file from the fixtures folder', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Selects a file using drag and drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Selects a file using an aliased fixture', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Checks that the privacy policy opens in a new tab without the need for a click', () => {
    
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
      
  })

  it('Checks the privacy policy by removing the target and then clicking the link', () => {
    
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
      
  })

  it('Check the privacy policy page independently', () => {
    
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
      
  })

  it('Show and hidden the success and error message using .invoke ', () => {
    
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

      cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
      
  })

  it('Fill out the text area field using command .invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Um texto qualquer')
      .should('have.value', 'Um texto qualquer')
  })

  it('Send HTTP Request ', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  });

  it('Find the cat hidden', () => {
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')
      cy.get('#title')
        .invoke('text', 'CAT TAT')
      cy.get('#subtitle')
        .invoke('text', 'Eu gosto de gatos')
  });
})
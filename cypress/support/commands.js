Cypress.Commands.add('fillMandatoryFieldAndSubmit' , ()=>  {
    cy.get('#firstName').type('Marcio de Assis')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('marciomartinsvred@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
})
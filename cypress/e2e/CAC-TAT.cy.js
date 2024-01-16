describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () =>  {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário.', () =>  {
    const longtext = 'Testando formulario em JavaScript para preenchimento e envio do formulario.'
    cy.get('#firstName')
    .type('Marcio de Assis')
    .should('have.value', 'Marcio de Assis')
    cy.get('#lastName')
    .type('Martins')
    .should('have.value', 'Martins')
    cy.get('#email')
    .type('marciomartinsvred@gmail.com')
    .should('have.value', 'marciomartinsvred@gmail.com')
    cy.get('#phone')
    .type('24981612553')
    .should('have.value', '24981612553')
    cy.get('#open-text-area')
    .type(longtext, { delay: 15 })
    .should('have.value', 'Testando formulario em JavaScript para preenchimento e envio do formulario.')

    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida.', () =>  {
    const longtext = 'Testando formulario em JavaScript para preenchimento e envio do formulario.'
    cy.get('#firstName')
    .type('Marcio de Assis')
    .should('have.value', 'Marcio de Assis')
    cy.get('#lastName')
    .type('Martins')
    .should('have.value', 'Martins')
    cy.get('#email')
    .type('marciomartinsvred@gmail,com')
    .should('have.value', 'marciomartinsvred@gmail,com')
    cy.get('#phone')
    .type('24981612553')
    .should('have.value', '24981612553')
    cy.get('#open-text-area')
    .type(longtext, { delay: 0 })
    .should('have.value', 'Testando formulario em JavaScript para preenchimento e envio do formulario.')

    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })  

  it('Campo telefone continua vazio quando preenchido com valor não-numérico.', () =>  {
    cy.get('#phone')
    .type('abcdefghij')
    .should('have.value','')

    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })   

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário.', () =>  {
    const longtext = 'Testando formulario em JavaScript para preenchimento e envio do formulario.'
    cy.get('#firstName').type('Marcio de Assis')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('marciomartinsvred@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(longtext, { delay: 0 })

    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })     

  it('Preenche e limpa os campos nome, sobrenome, email e telefone.', () =>  {
    cy.get('#firstName')
      .type('Marcio')
      .should('have.value','Marcio')
      .clear()
      .should('have.value','')
    cy.get('#lastName')
      .type('Martins')
      .should('have.value','Martins')
      .clear()
      .should('have.value','')
    cy.get('#email')
      .type('marciomartinsvred@gmail.com')
      .should('have.value','marciomartinsvred@gmail.com')
      .clear()
      .should('have.value','')
    cy.get('#open-text-area')
      .type('teste')
      .should('have.value','teste')
      .clear()
      .should('have.value','')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () =>  {

    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
  })  

  it('Envia o formulário com sucesso usando um comando customizado.', () => {

    cy.fillMandatoryFieldAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto.', () => {
    cy.get('#product').select('YouTube')
    .should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value).', () => {
    cy.get('#product').select('mentoria')
    .should('have.value','mentoria')
  })

  it('seleciona um produto (Blog) por seu indice.', () => {
    cy.get('#product').select(1)
    .should('have.value','blog')
  })

  it('Marcar o tipo de atendimento "FeedBack".', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
    .should('have.value','feedback')
  })

  it('Marcar cada tipo de atendimento.', () => {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(($radio) => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('Marcar ambos checkboxes e depois desmarca o ultimo.', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures.', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should( ($input) => { expect($input[0].files[0].name).to.equal('example.json') } )
  })

  it('Seleciona um arquivo simulando um drag-and-drop.', () => {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
      .should( ($input) => { expect($input[0].files[0].name).to.equal('example.json') } )  
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias.', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]#file-upload')
      .selectFile('@sampleFile')
      .should( ($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique.', () => {
    cy.get('#privacy a').should('have.attr','target','_blank')
  })

  it('Acessa a pagina de politica de privacidade removendo o target e então clicando no link.', () => {
    cy.get('#privacy a')
      .invoke('removeAttr','target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
})  

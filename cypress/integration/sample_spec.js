describe ('Test #1', function () {
  it('Does not much', function () {
    expect(true).to.equal(true);
  }),
  
  it('Visits portfolio', function () {
    cy.visit('https://www.agustinaoh.com')
    cy.pause()
  }),
  

  it('Finds an element', function () {
    cy.contains('talk')
  }),

  it('Get, type, assert', function () {
    cy.get('#full-name')
      .type('Agustina Oh')
      .should('have.value', 'Agustina Oh')
  })
  // it('Clicks on an element', function () {
  //   cy.contains('github').click()
  // })

  // it('Makes an assertion', function () {
  //   cy.url()
  //     .should('include', '/agustinaoh')
  // })
});
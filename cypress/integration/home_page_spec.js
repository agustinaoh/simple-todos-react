describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  }),

  it('logs in', () => {
    cy.get('#username').type('meteorite')

    cy.get('#password').type('password')

    cy.contains('Log in').click()

    cy.contains('Add Task')
  }),

  it('creates a new task', () => {
    cy.get('.task-form').type('Set a new task');
    cy.contains('Add Task').click()

    cy.get('li').should('contain', 'Set a new task')

    // cy.get('.app-header > h2').should('contain', 'Pending').pause()
  });
})
// cypress/e2e/lista_tareas.cy.js

describe('Lista de Tareas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Carga correctamente la página', () => {
    cy.contains('Lista de Tareas')
  })

  it('Agrega una tarea a la lista', () => {
    cy.get('#nueva-tarea').type('Aprender Cypress')
    cy.contains('Agregar').click()
    cy.get('#lista li').should('contain.text', 'Aprender Cypress')
  })

  it('No agrega tarea vacía', () => {
    cy.contains('Agregar').click()
    cy.get('#lista li').should('have.length', 0)
  })
})

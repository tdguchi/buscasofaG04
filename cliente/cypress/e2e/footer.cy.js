describe('Prueba del Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('El footer existe en la página', () => {
    cy.get('footer#footer').should('exist');
  });

  it('El footer contiene el nombre Pablo Bourdelande', () => {
    cy.get('footer#footer').contains('Pablo Bourdelande').should('exist');
  });

  it('El footer contiene el nombre Juan María Pamies', () => {
    cy.get('footer#footer').contains('Juan María Pamies').should('exist');
  });

  it('El footer contiene el nombre Alvaro López', () => {
    cy.get('footer#footer').contains('Alvaro López').should('exist');
  });

  it('El footer contiene el nombre Carlos Torres', () => {
    cy.get('footer#footer').contains('Carlos Torres').should('exist');
  });

  it('El footer contiene el nombre Margarita Fernández', () => {
    cy.get('footer#footer').contains('Margarita Fernández').should('exist');
  });

  it('El footer muestra todos los miembros del equipo', () => {
    cy.get('footer#footer li').should('have.length', 5);
  });
});

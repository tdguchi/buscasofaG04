/// <reference types="cypress" />
// Pruebas de la página de perfil de usuario (/perfil)
//
// El perfil obtiene sus datos del backend (http://localhost:4000/api/profile),
// que no está disponible durante las pruebas e2e. Por eso se intercepta la
// llamada con cy.intercept y se sirve el fixture profile.json. Esto permite
// probar de forma aislada los estados de carga, error, edición y renderizado.

describe('Página de perfil de usuario', () => {
  beforeEach(() => {
    // La app obtiene los precios de combustible de una API externa antes de
    // montar las rutas. La interceptamos para que la página de perfil se cargue
    // de forma rápida y determinista, sin depender de un servicio externo.
    cy.intercept('GET', 'https://sedeaplicaciones.minetur.gob.es/**', {
      body: { ListaEESSPrecio: [] },
    }).as('getFuel');
    cy.intercept('GET', '**/api/profile', { fixture: 'profile.json' }).as('getProfile');
    cy.visit('/perfil');
    cy.wait('@getProfile');
  });

  it('muestra los datos del perfil del usuario (nombre, email e id)', () => {
    cy.get('[data-cy="profile-card"]').should('exist');
    cy.get('[data-cy="profile-name"]').should('contain', 'Jane');
    cy.get('[data-cy="profile-email"]').should('contain', 'jane@example.com');
    cy.get('[data-cy="profile-id"]').should('contain', '8739');
  });

  it('muestra el avatar con la inicial del nombre del usuario', () => {
    cy.get('[data-cy="profile-avatar"]').should('have.text', 'J');
  });

  it('permite editar y guardar el nombre mostrado del usuario', () => {
    cy.get('[data-cy="profile-edit-btn"]').click();

    cy.get('[data-cy="profile-name-input"]')
      .should('have.value', 'Jane')
      .clear()
      .type('Juana Pérez');
    cy.get('[data-cy="profile-save-btn"]').click();

    // El nombre y el avatar se actualizan con el nuevo valor.
    cy.get('[data-cy="profile-name"]').should('contain', 'Juana Pérez');
    cy.get('[data-cy="profile-avatar"]').should('have.text', 'JP');
    // El formulario de edición ya no se muestra.
    cy.get('[data-cy="profile-name-input"]').should('not.exist');
  });

  it('permite cancelar la edición sin modificar el nombre', () => {
    cy.get('[data-cy="profile-edit-btn"]').click();
    cy.get('[data-cy="profile-name-input"]').clear().type('Otro nombre');
    cy.get('[data-cy="profile-cancel-btn"]').click();

    cy.get('[data-cy="profile-name"]').should('contain', 'Jane');
  });

  it('muestra el indicador de carga mientras se obtiene el perfil', () => {
    // Respuesta retardada para poder observar el estado de carga.
    cy.intercept('GET', '**/api/profile', (req) => {
      req.reply({ delay: 800, fixture: 'profile.json' });
    }).as('getProfileSlow');

    cy.visit('/perfil');
    cy.get('[data-cy="profile-loading"]').should('exist');
    cy.wait('@getProfileSlow');
    cy.get('[data-cy="profile-name"]').should('contain', 'Jane');
  });

  it('muestra un mensaje de error si la API falla', () => {
    cy.intercept('GET', '**/api/profile', { statusCode: 500, body: {} }).as('getProfileError');

    cy.visit('/perfil');
    cy.wait('@getProfileError');
    cy.get('[data-cy="profile-error"]').should('exist');
  });
});

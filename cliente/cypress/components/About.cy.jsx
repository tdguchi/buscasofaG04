/// <reference types="Cypress" />
// import React from 'react'
import About from '../../src/components/About'

describe('<About />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<About />).then(() => {
      cy.get('h1').should('contain', 'Acerca de nosotros y nuestro equipo:')
      cy.get('#info').should('contain', 'Somos el equipo nº 5')
    })  
  })
})



  it('muestra los miembros del equipo con nombre, rol y descripción', () => {
    const members = [
      { name: 'Margarita Fernández García', role: 'Programadora' },
      { name: 'Pablo Bourdelande García', role: 'Jefe de Proyecto' },
      { name: 'Juan María Pamies García', role: 'Programador' },
      { name: 'Carlos Torres Cid', role: 'Programador' },
      { name: 'Álvaro López Morales', role: 'Director del Proyecto' }
    ]

    cy.mount(<About />)

    cy.get('.team-section h2').should('contain', 'Nuestro equipo')
    cy.get('[data-cy="member-card"]').should('have.length', members.length)

    members.forEach((member) => {
      cy.get('[data-cy="member-card"]')
        .contains('.member-name', member.name)
        .closest('[data-cy="member-card"]')
        .within(() => {
          cy.get('.member-role').should('contain', member.role)
          cy.get('.member-bio').invoke('text').should('have.length.greaterThan', 50)
        })
    })
  })
})

import React from 'react'
import './About.css'

const team = [
  {
    name: 'Margarita Fernández García',
    role: 'Programadora',
    bio: 'Se ha encargado de los cambios en los ficheros App.jsx  y  Home.tsx para corregir la arquitectura de la App y que sea siempre visible.'
  },
  {
    name: 'Pablo Bourdelande García',
    role: 'Jefe de Proyecto',
    bio: 'Se ha encargado de los cambios en los ficheros Header.jsx, Footer.jsx y cypress/e2e/footer.cy.js  Ha realizado las pruebas Footer.'
  },
  {
    name: 'Juan María Pamies García',
    role: 'Programador',
    bio: 'Se ha encargado de completar la página Abouty probarla, además de añadir a los miembros y funciones del equipo.'
  },
  {
    name: 'Carlos Torres Cid',
    role: 'Programador',
    bio: 'Se ha encargado de los cambios en los componentes NotFound, en corregir la ruta 404 y en corregir el fix step notfound.'
  },
  {
    name: 'Álvaro López Morales',
    role: 'Director del Proyecto',
    bio: 'Se ha encargado de realizar y modificar la página del perfil de usuario y realizar la prueba de perfil.'
  }
]

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

const About = () => {
  return (
    <div className="about-container">
      <h1>Acerca de nosotros</h1>
      <div id="info">
        Somos el equipo nº<span>04</span>
      </div>

      <section className="team-section">
        <h2>Nuestro equipo</h2>
        <div className="team-grid" data-cy="team-grid">
          {team.map((member) => (
            <article className="member-card" data-cy="member-card" key={member.name}>
              <div className="member-avatar" aria-hidden="true">
                {initials(member.name)}
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About

import React from 'react'
import './About.css'

const team = [
  {
    name: 'Margarita Fernández García',
    role: 'Programadora',
    bio: 'Programadora especializada en desarrollo de aplicaciones y mantenimiento de sistemas informáticos. Participa en el análisis, diseño e implementación de soluciones tecnológicas, garantizando la calidad del código y el cumplimiento de los requisitos funcionales del proyecto.'
  },
  {
    name: 'Pablo Bourdelande García',
    role: 'Jefe de Proyecto',
    bio: 'Profesional con experiencia en dirección y coordinación de proyectos tecnológicos. Responsable de la planificación, seguimiento y control de las actividades del equipo, asegurando el cumplimiento de los objetivos, plazos y estándares de calidad establecidos.'
  },
  {
    name: 'Juan María Pamies García',
    role: 'Programador',
    bio: 'Desarrollador de software con experiencia en programación y soporte técnico de aplicaciones. Colabora en la construcción, optimización y evolución de soluciones informáticas, contribuyendo al correcto funcionamiento de los sistemas desarrollados.'
  },
  {
    name: 'Carlos Torres Cid',
    role: 'Programador',
    bio: 'Especialista en desarrollo de software y resolución de incidencias técnicas. Participa en la implementación de nuevas funcionalidades, pruebas y mantenimiento de aplicaciones, velando por la estabilidad y eficiencia de las soluciones tecnológicas.'
  },
  {
    name: 'Álvaro López Morales',
    role: 'Director del Proyecto',
    bio: 'Director del proyecto responsable de la supervisión estratégica y la toma de decisiones clave. Coordina los recursos humanos y técnicos, define las líneas de actuación y garantiza la consecución de los objetivos del proyecto conforme a los requisitos del cliente y de la organización.'
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
        Somos el equipo nº 23
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

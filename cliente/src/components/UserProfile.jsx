import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';

// Endpoint del backend que devuelve los datos del perfil del usuario autenticado.
// En las pruebas e2e se intercepta con cy.intercept para no depender del servidor real.
const PROFILE_URL = 'http://localhost:4000/api/profile';

// Calcula las iniciales (máximo 2) a partir del nombre para mostrarlas en el avatar.
const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

// Página de perfil de usuario.
// Obtiene los datos del usuario desde el backend, gestionando los estados de
// carga y error, y permite editar el nombre que se muestra en el perfil.
function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado de edición del nombre mostrado.
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(PROFILE_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo cargar el perfil');
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setDraftName(data.name);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    setDraftName(profile.name);
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const nuevoNombre = draftName.trim();
    if (!nuevoNombre) return;
    setProfile({ ...profile, name: nuevoNombre });
    setEditing(false);
  };

  const handleCancel = () => {
    setDraftName(profile.name);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-container">
        <p className="profile-loading" data-cy="profile-loading">
          Cargando perfil...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <p className="profile-error" data-cy="profile-error">
          Error: {error}
        </p>
        <Link to="/login" className="profile-link">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Mi perfil</h1>

      <article className="profile-card" data-cy="profile-card">
        <div className="profile-avatar" data-cy="profile-avatar" aria-hidden="true">
          {getInitials(profile.name)}
        </div>

        {!editing ? (
          <>
            <h2 className="profile-name" data-cy="profile-name">
              {profile.name}
            </h2>
            <p className="profile-email" data-cy="profile-email">
              {profile.email}
            </p>
            <p className="profile-id" data-cy="profile-id">
              ID de usuario: {profile.id}
            </p>
            <button
              type="button"
              className="profile-edit-btn"
              data-cy="profile-edit-btn"
              onClick={handleEdit}
            >
              Editar nombre
            </button>
          </>
        ) : (
          <form className="profile-edit-form" onSubmit={handleSave}>
            <label htmlFor="profile-name-input">Nombre</label>
            <input
              id="profile-name-input"
              name="name"
              type="text"
              value={draftName}
              data-cy="profile-name-input"
              onChange={(e) => setDraftName(e.target.value)}
              required
            />
            <div className="profile-edit-actions">
              <button type="submit" className="profile-save-btn" data-cy="profile-save-btn">
                Guardar
              </button>
              <button
                type="button"
                className="profile-cancel-btn"
                data-cy="profile-cancel-btn"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </article>
    </div>
  );
}

export default UserProfile;

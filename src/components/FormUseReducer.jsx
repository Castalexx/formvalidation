import React, { useReducer } from 'react';

const initialState = {
  name: '',
  surname: '',
  email: '',
  nameError: '',
  surnameError: '',
  emailError: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateName':
      return {
        ...state,
        name: action.payload,
        nameError: action.payload.length < 3 ? 'El nombre debe tener al menos 3 caracteres' : '',
      };
    case 'updateSurname':
      return {
        ...state,
        surname: action.payload,
        surnameError: action.payload.length < 3 ? 'El apellido debe tener al menos 3 caracteres' : '',
      };
    case 'updateEmail':
      return {
        ...state,
        email: action.payload,
        emailError: !/^\S+@\S+\.\S+$/.test(action.payload) ? 'Introduzca un correo electrónico válido' : '',
      };
    default:
      throw new Error();
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = event => {
    event.preventDefault();
    // Aquí podrías enviar el formulario al servidor si no hay errores
    console.log(state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={state.name}
          onChange={event => dispatch({ type: 'updateName', payload: event.target.value })}
        />
        {state.nameError && <p>{state.nameError}</p>}
      </label>
      <br />
      <label>
        Apellido:
        <input
          type="text"
          value={state.surname}
          onChange={event => dispatch({ type: 'updateSurname', payload: event.target.value })}
        />
        {state.surnameError && <p>{state.surnameError}</p>}
      </label>
      <br />
      <label>
        Correo electrónico:
        <input
          type="text"
          value={state.email}
          onChange={event => dispatch({ type: 'updateEmail', payload: event.target.value })}
        />
        {state.emailError && <p>{state.emailError}</p>}
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Form;


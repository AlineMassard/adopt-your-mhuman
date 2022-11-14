import React, { useState } from 'react';
import {
  Button, Form, Message,
} from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import useUserReducer, { getActionSetValue } from '../../hooks/useUserReducer';
import { deleteUserRequest, updateUserRequest } from '../../requests/profilesRequest';
import Logo from '../LandingPage/logo.png';
import './updateprofileuserstyles.scss';
import { setToken } from '../../requests/instance';

function UpdateProfileUser() {
  const { userState, userDispatch } = useUserReducer();
  const [errorMessage, setErrorMessage] = useState('');
  const [UpdateUserProfile, setUpdateUserProfile] = useState(false);
  const userEmail = localStorage.getItem('userEmail');

  const fetchData = async ({ email, password }) => {
    try {
      const response = updateUserRequest({

        email,
        password,

      });
      if (response.status === 200) {
        setUpdateUserProfile();
      }
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
  }, []);

  const handleTextFieldChange = (e) => {
    userDispatch(getActionSetValue(e.target.name, e.target.value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Je verifie que l'utilisateur à entré un email
    if (!userState.email.trim()) {
      setErrorMessage("L'email est obligatoire");
      return;
    }
    // Je verifie que l'utilisateur à entré un mot de passe
    if (!userState.password.trim()) {
      setErrorMessage('Le mot de passe est obligatoire');
      return;
    }
    // Je verifie si l'utilisateur à bien confirmer son mot de passe
    // if (userState.password !== userState.passwordConfirm) {
    //   setErrorMessage('Votre confirmation de mot de passe est incorrect');
    //   return;
    // }
    // TODO : use emailValue and passwordValue for add new user in db
    fetchData(userState);
  };

  const handleDelete = () => {
    deleteUserRequest();
    setUpdateUserProfile(true);
  };

  const handleDismiss = () => { // Gere la fermeture du message
    setErrorMessage('');
  };

  return (
    <div className="update-user">
      <div className="landingTitle">
        <img src={Logo} alt="logo" />
      </div>
      {errorMessage
          && (
          <Message
            negative
            className="error-msg"
            header="Erreur"
            onDismiss={handleDismiss}
            content={errorMessage}
          />
          )}
      <Form onSubmit={handleSubmit}>
        <h3> Modifier mon email ou mon mot de passe </h3>
        <Form.Field>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={userState.email}
            onChange={handleTextFieldChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="password"
            placeholder="Nouveau mot de passe"
            type="password"
            value={userState.password}
            onChange={handleTextFieldChange}
          />
        </Form.Field>
        {/* <Form.Field>
          <input
            name="passwordConfirm"
            placeholder="Confirmer le nouveau mot de passe"
            type="password"
            value={userState.passwordConfirm}
            onChange={handleTextFieldChange}
          />
        </Form.Field> */}
        <div className="signup-buttons">
          <Button
            negative
            size="big"
            type="submit"
            onClick={handleDelete}
          >
            Supprimer
          </Button>
          <Button
            size="big"
            type="submit"
          >
            Valider
          </Button>
        </div>
      </Form>
      <div className="return-button">
        {/* <Button
          onClick={handleReturnClick}
          size="big"
          animated="fade"
        >
          <Button.Content visible>Retour</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button> */}
      </div>
      { UpdateUserProfile && (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default React.memo(UpdateProfileUser);

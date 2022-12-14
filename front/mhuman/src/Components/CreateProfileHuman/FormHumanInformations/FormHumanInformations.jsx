/* eslint-disable jsx-a11y/label-has-associated-control */
import './formhumaninformationstyles.scss';
import React, { useState, useContext } from 'react';
import {
  Button, Icon, Form, Input, Message, Radio,
} from 'semantic-ui-react';

import propTypes from 'prop-types';
import FormHumanDesc from '../FormHumanDesc/FormHumanDesc';
import useHumanProfileReducer, { getActionSetValue } from '../../../hooks/useHumanProfileReducer';
import AddHumanProfileContext from '../../../contexts/AddHumanProfileContext';
import { setToken } from '../../../requests/instance';
import { getAllHumanRequest } from '../../../requests/getHumanRequest';

function FormHumanInformations({
  handleReturnClick,
}) {
  const { addHumanInformation } = useContext(AddHumanProfileContext);
  const { humanProfileState, humanProfileDispatch } = useHumanProfileReducer();
  const [humans, setHumans] = useState([]);
  const [existedPseudo, setExistedPseudo] = useState(true);
  const [next, setNext] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const PseudoExist = (param) => humans.some((e) => e.pseudo === param);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!humanProfileState.name.trim()) {
      setErrorMessage('Le nom est obligatoire');
      return;
    }
    if (!humanProfileState.pseudo.trim()) {
      setErrorMessage('Le pseudo est obligatoire');
      return;
    }
    if (PseudoExist(humanProfileState.pseudo)) {
      setErrorMessage('Ce pseudo existe déja');
      return;
    }
    if (!humanProfileState.age.trim()) {
      setErrorMessage('L\'age est obligatoire');
      return;
    }
    addHumanInformation(humanProfileState);
    setNext('FormHumanDesc');
  };
  const handleDismiss = () => {
    setErrorMessage('');
  };

  const handlePseudoFieldChange = (e) => {
    humanProfileDispatch(getActionSetValue(e.target.name, e.target.value));
    if (PseudoExist(e.target.value) || !e.target.value.trim()) {
      setExistedPseudo(true);
    } else {
      setExistedPseudo(false);
    }
  };

  const handleTextFieldChange = (e) => {
    humanProfileDispatch(getActionSetValue(e.target.name, e.target.value));
  };
  const handleRadioFieldChange = (e, { name, value }) => {
    humanProfileDispatch(getActionSetValue(name, value));
  };
  const handleReturnButton = () => {
    setNext('');
  };

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
    async function getHumans() {
      const response = await getAllHumanRequest();
      setHumans(response);
    }
    getHumans();
  }, []);

  return (
    <>
      {!next && (
        <div className="form-human-informations">
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
          <form>
            <Form.Group className="form-informations">
              <Input
                className="form-informations-input"
                id="form-input-control-first-name"
                placeholder="Name"
                name="name"
                value={humanProfileState.name}
                onChange={handleTextFieldChange}
              />
              <Input
                className="form-informations-input"
                id="form-input-control-last-name"
                placeholder="Pseudo"
                name="pseudo"
                icon={existedPseudo ? 'close' : 'check'}
                value={humanProfileState.pseudo}
                onChange={handlePseudoFieldChange}
              />
              <Input
                className="form-informations-input"
                label={{ basic: true, content: 'ans' }}
                labelPosition="right"
                placeholder="Entrez votre âge"
                name="age"
                type="number"
                value={humanProfileState.age}
                onChange={handleTextFieldChange}
              />
            </Form.Group>

            <div className="form-informations-radios">
              <Form.Group grouped>
                <label htmlFor="has_pets">Avez-vous des animaux ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_pets"
                    value="true"
                    checked={humanProfileState.has_pets === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_pets"
                    value="false"
                    checked={humanProfileState.has_pets === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="has_kids">Avez-vous des enfants ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_kids"
                    value="true"
                    checked={humanProfileState.has_kids === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_kids"
                    value="false"
                    checked={humanProfileState.has_kids === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="has_garden">Avez-vous un jardin ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_garden"
                    value="true"
                    checked={humanProfileState.has_garden === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_garden"
                    value="false"
                    checked={humanProfileState.has_garden === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
            </div>
            <div className="form-human-buttons">
              <Button
                className="form-human-button"
                onClick={handleReturnClick}
                animated="fade"
              >
                <Button.Content visible>Retour</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>

              <Button
                className="form-human-button"
                onClick={handleSubmit}
                animated="fade"
              >
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </div>
          </form>
        </div>
      )}
      {next === 'FormHumanDesc'
        && (
          <FormHumanDesc
            handleReturnClick={handleReturnButton}
          />
        )}
    </>
  );
}

FormHumanInformations.propTypes = {
  handleReturnClick: propTypes.func.isRequired,
};

export default React.memo(FormHumanInformations);

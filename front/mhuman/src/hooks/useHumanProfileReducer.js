import { useReducer } from 'react';

const humanProfileInitialState = {
  name: '',
  pseudo: '',
  description: '',
  age: '',
  has_pets: 'false',
  has_kids: 'false',
  has_garden: 'false',
  fileUpload: null,
};

function humanProfileReducer(oldState, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...oldState,
        [action.payload.name]: action.payload.value,
      };
    case 'INIT_VALUE':
      return action.payload;
    case 'RESET': {
      return humanProfileInitialState;
    }
    default:
      return oldState;
  }
}

export function getActionSetValue(name, value) {
  return {
    type: 'SET_VALUE',
    payload: {
      name, value,
    },
  };
}

export function getActionInitValue(obj) {
  return {
    type: 'INIT_VALUE',
    payload: obj,
  };
}

function useHumanProfileReducer() {
  const [humanProfileState, humanProfileDispatch] = useReducer(humanProfileReducer, humanProfileInitialState);
  return {
    humanProfileState, humanProfileDispatch,
  };
}

export default useHumanProfileReducer;

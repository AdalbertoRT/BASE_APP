/* Cria os reducers para cada tipo de dado (Exemplo: userReducer – para dados do usuário)*/

/*Exemplo de state(dados) de usuário vindos de uma requisição, webservice etc*/
const initialState = {
  title: 'BASE APP',
  description:
    'Estrutura básica com Redux e Redux-Persist já configurado para desenvolvimento de app React Native',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {...state, title: action.payload.title};
      break;
    case 'SET_DESCRIPTION':
      return {...state, description: action.payload.description};
      break;
  }

  return state;
};

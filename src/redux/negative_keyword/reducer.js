import generateHandleActions from 'redux/state-handler';
import { LIST_NEGATIVE_KEYWORDS, CREATE_NEGATIVE_KEYWORDS, REMOVE_NEGATIVE_KEYWORD } from 'redux/constants';

const apiStates = [
  { type: LIST_NEGATIVE_KEYWORDS, name: 'negativeKeywords', apiField: 'data' },
  { type: CREATE_NEGATIVE_KEYWORDS, name: 'createNegativeKeywords' },
  { type: REMOVE_NEGATIVE_KEYWORD, name: 'removeNegativeKeyword' },
];

const instantStates = [];

const listValues = ['negativeKeywords'];

export default generateHandleActions({ apiStates, instantStates, listValues });

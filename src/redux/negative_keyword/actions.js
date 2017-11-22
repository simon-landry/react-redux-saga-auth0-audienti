import { createApiAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import { LIST_NEGATIVE_KEYWORDS, CREATE_NEGATIVE_KEYWORDS } from 'redux/constants';

const negativeKeywordApi = restApis('projects', 'negative_keywords');

export const listNegativeKeywords = createApiAction(
  LIST_NEGATIVE_KEYWORDS, negativeKeywordApi.list,
);
export const createNegativeKeywords = createApiAction(
  CREATE_NEGATIVE_KEYWORDS, negativeKeywordApi.create, { title: 'Success', detail: 'Negative keywords are created successfully' },
);

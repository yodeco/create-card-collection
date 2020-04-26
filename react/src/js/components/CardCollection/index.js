import { createStore } from 'redux';

import reducer from './Reducers/index';

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(reducer);

import { createScope } from '../CliTools';
import createStoreWithScope from './createStoreWithScope';

const createStore = () => createStoreWithScope(createScope());

export default createStore;

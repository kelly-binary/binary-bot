import stage from './';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import action from '../actionCreator';

describe('Stage Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = stage(state, action(actions.INVALID)))).toEqual(states.STOPPED);
    });
    it('Fatal error occurred during trade', () => {
        expect(stage(states.STARTED, action(actions.STOP_BECAUSE_OF_ERROR))).toEqual(states.STOPPED);
    });
    it('Engine received the initData', () => {
        expect((state = stage(state, action(actions.INITIALIZE)))).toEqual(states.INITIALIZED);
    });
    it('Engine started', () => {
        expect((state = stage(state, action(actions.START)))).toEqual(states.STARTED);
    });
    it('All requested proposals are ready', () => {
        expect((state = stage(state, action(actions.RECEIVE_ALL_PROPOSALS)))).toEqual(states.PROPOSALS_READY);
    });
    it('Purchase requested', () => {
        expect((state = stage(state, action(actions.REQUEST_PURCHASE)))).toEqual(states.PURCHASING);
    });
    it('Purchase failed', () => {
        expect((state = stage(state, action(actions.PURCHASE_UNSUCCESSFULLY)))).toEqual(states.STARTED);
    });
    it('Purchase succeeded', () => {
        expect((state = stage(state, action(actions.PURCHASE_SUCCESSFULLY)))).toEqual(states.SUCCESSFUL_PURCHASE);
    });
    it('Open contract received', () => {
        expect((state = stage(state, action(actions.RECEIVE_OPEN_CONTRACT)))).toEqual(states.OPEN_CONTRACT);
    });
    it('Sell succeeded', () => {
        expect((state = stage(state, action(actions.SELL_SUCCESSFULLY)))).toEqual(states.INITIALIZED);
    });
});

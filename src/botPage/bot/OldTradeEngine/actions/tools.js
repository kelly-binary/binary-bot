import { createScope } from '../../CliTools';

export const getDispatchFromAction = ({ action, state, arg, $scope = createScope() }) => {
    const dispatch = jest.fn();
    const thunk = action(arg);
    if (typeof thunk === 'function') {
        thunk(dispatch, () => state, $scope);
    } else {
        dispatch(thunk);
    }
    return dispatch;
};

export const toBeCalledWith = arg => expect(getDispatchFromAction(arg)).toBeCalledWith(arg.calledWith);

export const toBeCalledWithAsync = async ({ action, state, arg, calledWith, $scope = createScope() }) => {
    const asyncDispatch = await new Promise(resolve => {
        const dispatch = jest.fn();
        const thunk = action(arg);
        thunk(
            a => {
                dispatch(a);
                resolve(dispatch);
            },
            () => state,
            $scope
        );
    });
    expect(asyncDispatch).toBeCalledWith(calledWith);
};

export const notToBeCalled = arg => expect(getDispatchFromAction(arg)).not.toBeCalled();

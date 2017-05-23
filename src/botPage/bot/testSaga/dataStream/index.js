import { eventChannel, END } from 'redux-saga';

const dataStream = ({ $scope: { api }, type }) =>
    eventChannel(emit => {
        api.events.on(type, ({ [type]: payload }) => emit(payload));

        return () => {
            emit(END);
            api.events.ignoreAll(type);
        };
    });

export default dataStream;

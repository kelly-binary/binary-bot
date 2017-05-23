import { eventChannel } from 'redux-saga';

let key;

const dataStream = ({ $scope: { api, tickService }, type, symbol }) =>
    eventChannel(emit => {
        if (type === 'tick') {
            key = tickService.monitor({
                symbol,
                callback({ [type]: payload }) {
                    emit(payload);
                },
            });
        } else {
            api.events.on(type, ({ [type]: payload }) => emit(payload));
        }

        return () => {
            if (type === 'tick') {
                tickService.stopMonitor({ symbol, key });
            } else {
                api.events.ignoreAll(type);
            }
        };
    });

export default dataStream;

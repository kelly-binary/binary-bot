import { eventChannel } from 'redux-saga';

let key;

const dataStream = ({ $scope: { api, ticksService }, type, symbol }) =>
    eventChannel(emit => {
        if (type === 'tick') {
            key = ticksService.monitor({
                symbol,
                callback(ticks) {
                    emit(ticks.slice(-1)[0]);
                },
            });
        } else {
            api.events.on(type, ({ [type]: payload }) => emit(payload));
        }

        return () => {
            if (type === 'tick') {
                ticksService.stopMonitor({ symbol, key });
            } else {
                api.events.ignoreAll(type);
            }
        };
    });

export default dataStream;

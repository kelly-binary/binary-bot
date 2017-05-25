import { fork, takeEvery } from 'redux-saga/effects';

function* intermediateGen(saga, ...args) {
    yield fork(saga, ...args.slice(0, -1), args.slice(-1)[0].payload);
}

export default function customTakeEvery(pattern, saga, ...args) {
    return takeEvery(pattern, intermediateGen, saga, ...args);
}

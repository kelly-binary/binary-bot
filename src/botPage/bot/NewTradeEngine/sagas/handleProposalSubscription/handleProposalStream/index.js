export default function* handleProposalStream(channel) {
    const propsoalResponse = yield take(channel);
    const forgottenProposals = yield select(selectors.forgottenProposals);
}

import { doUntilDone } from '../../../../tools';

const requestBalance = async ({ $scope, token }) => {
    const { api } = $scope;
    await doUntilDone(() => api.authorize(token));
    doUntilDone(() => api.subscribeToBalance());
};

export default requestBalance;

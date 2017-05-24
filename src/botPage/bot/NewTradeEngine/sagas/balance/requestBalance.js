const requestBalance = async ({ $scope, token }) => {
    const { api } = $scope;
    await api.authorize(token);
    api.subscribeToBalance();
};

export default requestBalance;

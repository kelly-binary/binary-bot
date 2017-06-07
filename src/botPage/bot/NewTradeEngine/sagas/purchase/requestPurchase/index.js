import { doUntilDone } from '../../../../tools';

export default function requestPurchase({ $scope: { api }, proposal }) {
    const { id, ask_price: askPrice } = proposal;
    return doUntilDone(() => api.buyContract(id, askPrice));
}

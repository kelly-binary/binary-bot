import { doUntilDone } from '../../../../tools';

export default function requestPurchase({ $scope: { api }, proposal: { id, ask_price: askPrice } }) {
    return doUntilDone(() => api.buyContract(id, askPrice));
}

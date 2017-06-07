import { doUntilDone } from '../../../../tools';

export default function requestPurchase({ $scope: { api }, proposal }) {
    console.log(proposal);
    const { id, ask_price: askPrice } = proposal;
    return doUntilDone(() => api.buyContract(id, askPrice));
}

import * as actions from '../../constants/actions';

export default function requestPurchase() {
    return {
        type: actions.REQUEST_PURCHASE,
    };
}

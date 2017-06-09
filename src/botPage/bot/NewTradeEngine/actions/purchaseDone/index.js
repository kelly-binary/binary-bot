import * as actions from '../../constants/actions';

export default function purchaseDone({ payload, error }) {
    const baseAction = {
        type: actions.PURCHASE_DONE,
        payload,
    };
    if (error) {
        return { ...baseAction, error: true };
    }
    return baseAction;
}

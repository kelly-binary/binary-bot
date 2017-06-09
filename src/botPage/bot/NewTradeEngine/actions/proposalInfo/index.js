import { removePropertyAction, updatePropertyAction } from '../../tools';

export default function proposalInfo({ itemName, payload, meta = {} }) {
    const { remove } = meta;

    if (remove) {
        return {
            type: removePropertyAction(itemName),
            payload,
        };
    }
    return {
        type: updatePropertyAction(itemName),
        payload,
    };
}

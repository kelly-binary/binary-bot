export default function proposalInfo({ itemName, payload, meta = {} }) {
    const { remove } = meta;

    if (remove) {
        return {
            type: `REMOVE_${itemName}`,
            payload,
        };
    }
    return {
        type: `UPDATE_${itemName}`,
        payload,
    };
}

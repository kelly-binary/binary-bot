export default function proposalInfo({ property, payload, meta = {} }) {
    const { remove } = meta;

    if (remove) {
        return {
            type: `REMOVE_${property}`,
            payload,
        };
    }
    return {
        type: `UPDATE_${property}`,
        payload,
    };
}

export default function standardAction(type) {
    return payload => ({
        type,
        payload,
    });
}

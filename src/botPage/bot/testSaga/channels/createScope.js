export default function createScope() {
    const events = {
        callbacks: [],
        on(type, callback) {
            this.callbacks[type] = callback;
        },
        emit(type, payload) {
            if (type in this.callbacks) {
                this.callbacks[type](payload);
            }
        },
        ignoreAll(type) {
            delete this.callbacks[type];
        },
    };
    return { api: { events } };
}

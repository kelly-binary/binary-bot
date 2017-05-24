export default function createScope() {
    const api = {
        events: {
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
        },
    };

    const ticksService = {
        monitor({ callback }) {
            this.callback = callback;
            return 'key';
        },
        emit(paylaod) {
            this.callback(paylaod);
        },
        stopMonitor({ key }) {
            if (key === 'key') {
                this.callback = () => {};
            }
        },
    };
    return { api, ticksService };
}

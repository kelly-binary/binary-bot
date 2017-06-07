const waitForCondition = (store, condition, stopCondition = () => false) =>
    new Promise(resolve => {
        const unsubscribe = store.subscribe(() => {
            const state = store.getState();

            const shouldStopWaiting = stopCondition(state);
            const shouldContinue = condition(state);

            if (shouldStopWaiting) {
                resolve(false);
                unsubscribe();
            } else if (shouldContinue) {
                resolve(true);
                unsubscribe();
            }
        });
    });

export default waitForCondition;

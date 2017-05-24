const waitForCondition = (store, condition, stopCondition = () => false) =>
    new Promise(resolve => {
        const unsubscribe = store.subscribe(() => {
            if (stopCondition(store.getState())) {
                resolve(false);
                unsubscribe();
                return;
            }
            if (condition(store.getState())) {
                resolve(true);
                unsubscribe();
            }
        });
    });

export default waitForCondition;

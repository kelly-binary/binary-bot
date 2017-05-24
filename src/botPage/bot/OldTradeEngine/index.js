import createStoreWithScope from './createStoreWithScope';
import initializer from './actors/initializer';
import starter from './actors/starter';
import proposalMaker from './actors/proposalMaker';
import watcher from './actors/watcher';
import purchaser from './actors/purchaser';
import openContractManager from './actors/openContractManager';
import seller from './actors/seller';

class Bot {
    constructor($scope) {
        this.$scope = $scope;
        this.store = createStoreWithScope(this.$scope);
    }
    async init(token, initOptions) {
        const data = { token, initOptions };
        await initializer({ data, store: this.store });
    }
    /* eslint-disable class-methods-use-this */
    start(data) {
        starter({ store: this.store, data });
        proposalMaker({ store: this.store });
    }
    watch(name) {
        return watcher({ store: this.store, name });
    }
    async purchase(data) {
        await purchaser({ store: this.store, data });
        openContractManager({ store: this.store });
    }
    isSellAtMarketAvailable() {
        const { contract: { is_sold: isSold, is_valid_to_sell: isValidToSell } } = this.store.getState();
        return !isSold && isValidToSell;
    }
    async sellAtMarket() {
        return seller({ store: this.store });
    }
    /* eslint-enable */
}

export default Bot;

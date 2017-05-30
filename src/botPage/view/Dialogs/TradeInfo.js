import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { getToken } from 'binary-common-utils/lib/storageManager';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { translate } from '../../../common/i18n';
import Dialog from './Dialog';
import TradeTable from '../react-components/TradeTable/TradeTable';

class TradeInfoContent extends PureComponent {
    constructor() {
        super();
        this.state = {
            tradeInfo: {},
            trade    : {
                transaction_ids: {
                    buy: '',
                },
                contract_type: '',
                entry_tick   : '',
                exit_tick    : '',
                buy_price    : '',
                sell_price   : '',
            },
        };
        this.addEventHandlers();
    }
    addEventHandlers() {
        globalObserver.register('bot.info', info => {
            this.setState({ tradeInfo: info });
            if ('profit' in info) {
                const token = $('.account-id').first().attr('value');
                const user = getToken(token);
                globalObserver.emit('log.revenue', {
                    user,
                    profit  : info.profit,
                    contract: info.contract,
                });
            }
        });

        globalObserver.register('bot.contract', c => {
            if (c) {
                this.setState({ trade: c });
            }
        });
    }
    render() {
        return (
            <div>
                <TradeTable trade={{ reference: this.state.trade.transaction_ids.buy, ...this.state.trade }} />
            </div>
        );
    }
}

export default class TradeInfo extends Dialog {
    constructor() {
        super('tradeinfo-dialog', translate('Trade info'), <TradeInfoContent />);
    }
}

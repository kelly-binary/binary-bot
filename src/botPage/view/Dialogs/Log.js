import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { translate } from '../../../common/i18n';
import Dialog from './Dialog';
import LogTable from '../react-components/LogTable/LogTable';

class LogContent extends PureComponent {
    constructor() {
        super();
        this.state = {
            log: {
                type     : '',
                message  : '',
                timestamp: '',
            },
        };
        this.logHandler();
    }
    notify(className, msg) {
        const date = new Date();
        const timestamp = `${date.toISOString().split('T')[0]} ${date.toTimeString().slice(0, 8)}`;
        this.setState({ log: { type: className, timestamp, message: msg } });
        this.log(className, msg);
    }

    notifyError(error) {
        if (!error) {
            return;
        }

        let message = error.message;
        let errorCode = error.name;

        if (error.error) {
            message = error.error.message;
            errorCode = error.error.errorCode;
            if (error.error.error) {
                message = error.error.error.message;
                message = error.error.error.message;
                errorCode = error.error.error.errorCode;
            }
        }

        if (errorCode === 'DisconnectError') {
            message = translate('Connection lost before receiving the response from the server');
        }

        const errorWithCode = new Error(error);
        errorWithCode.message = errorCode ? `${errorCode}: ${message}` : message;

        if (trackJs) {
            trackJs.track(errorWithCode);
        }

        this.notify('error', message, 'right');
    }
    log(type, ...args) {
        if (type === 'warn') {
            console.warn(...args); // eslint-disable-line no-console
        } else {
            console.log(...args); // eslint-disable-line no-console
        }
    }
    logHandler() {
        const notifList = ['success', 'info', 'warn', 'error'];

        const logList = [
            'log.bot.start',
            'log.bot.login',
            'log.bot.proposal',
            'log.purchase.start',
            'log.trade.purchase',
            'log.trade.update',
            'log.trade.finish',
        ];

        const amplitudeList = ['log.bot.login', 'log.trade.finish'];

        logList.forEach(event => globalObserver.register(event, d => this.log('info', event, d)));

        globalObserver.register('Notify', args => this.notify(...args));

        globalObserver.register('Error', this.notifyError);

        notifList.forEach(className =>
            globalObserver.register(`ui.log.${className}`, message => this.notify(className, message, 'right'))
        );

        amplitudeList.forEach(event => globalObserver.register(event, d => amplitude.getInstance().logEvent(event, d)));

        globalObserver.register('log.revenue', data => {
            const { user, profit, contract } = data;

            if (typeof amplitude !== 'undefined' && !user.isVirtual) {
                const revenue = new amplitude.Revenue()
                    .setProductId(`${contract.underlying}.${contract.contract_type}`)
                    .setPrice(-profit)
                    .setRevenueType(profit < 0 ? 'loss' : 'win');

                amplitude.getInstance().logRevenueV2(revenue, { contract });
            }
        });
    }
    render() {
        const log = this.state.log;
        return (
            <div id="logTable">
                <LogTable log={{ log }} />
            </div>
        );
    }
    static propTypes = {
        log: PropTypes.shape({
            type     : PropTypes.string,
            timestamp: PropTypes.string,
            message  : PropTypes.string,
        }),
    };
}

export default class Log extends Dialog {
    constructor() {
        super('log-dialog', translate('Log'), <LogContent />);
    }
}

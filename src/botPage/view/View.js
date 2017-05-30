import React from 'react';
import ReactDOM from 'react-dom';
import { logoutAllTokens } from 'binary-common-utils/lib/account';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import {
    getTokenList,
    removeAllTokens,
    get as getStorage,
    set as setStorage,
    getToken,
} from 'binary-common-utils/lib/storageManager';
import { LiveApi } from 'binary-live-api';
import 'jquery-ui/ui/widgets/dialog';
import _Blockly from './blockly';
import { translate } from '../../common/i18n';
import Save from './Dialogs/Save';
import Limits from './Dialogs/Limits';
import Chart from './Dialogs/Chart';
import Log from './Dialogs/Log';
import TradeInfo from './Dialogs/TradeInfo';
import { getLanguage } from '../../common/lang';
import { symbolPromise } from './shared';
import Tour from './tour';
import OfficialVersionWarning from './react-components/OfficialVersionWarning';

let realityCheckTimeout;

const api = new LiveApi({
    language: getStorage('lang') || 'en',
    appId   : getStorage('appId') || 1,
});

api.events.on('balance', response => {
    const { balance: { balance, currency } } = response;

    $('.topMenuBalance').text(`${balance} ${currency}`);
});

const addBalanceForToken = token => {
    api.authorize(token).then(() => {
        api.send({ forget_all: 'balance' }).then(() => {
            api.subscribeToBalance();
        });
    });
};

const showRealityCheck = () => {
    $('.blocker').show();
    $('.reality-check').show();
};

const hideRealityCheck = () => {
    $('#rc-err').hide();
    $('.blocker').hide();
    $('.reality-check').hide();
};

const stopRealityCheck = () => {
    clearInterval(realityCheckTimeout);
    realityCheckTimeout = null;
};

const realityCheckInterval = () => {
    realityCheckTimeout = setInterval(() => {
        const now = parseInt(new Date().getTime() / 1000);
        const checkTime = +getStorage('realityCheckTime');
        if (checkTime && now >= checkTime) {
            showRealityCheck();
            stopRealityCheck();
        }
    }, 1000);
};

const startRealityCheck = (time, token) => {
    stopRealityCheck();
    if (time) {
        const start = parseInt(new Date().getTime() / 1000) + time * 60;
        setStorage('realityCheckTime', start);
        realityCheckInterval();
    } else {
        const tokenObj = getToken(token);
        if (tokenObj.hasRealityCheck) {
            const checkTime = +getStorage('realityCheckTime');
            if (!checkTime) {
                showRealityCheck();
            } else {
                realityCheckInterval();
            }
        }
    }
};

const clearRealityCheck = () => {
    setStorage('realityCheckTime', null);
    stopRealityCheck();
};

const resetRealityCheck = token => {
    clearRealityCheck();
    startRealityCheck(null, token);
};

const limits = new Limits();
const saveDialog = new Save();

const updateTokenList = () => {
    const tokenList = getTokenList();
    const loginButton = $('#login');
    const accountList = $('#account-list');
    if (tokenList.length === 0) {
        loginButton.show();
        accountList.hide();
        $('.account-id').removeAttr('value').text('');
        $('.account-type').text('');
        $('.login-id-list').children().remove();
    } else {
        loginButton.hide();
        accountList.show();

        addBalanceForToken(tokenList[0].token);

        tokenList.forEach(tokenInfo => {
            let prefix = '';
            if ('isVirtual' in tokenInfo) {
                prefix = tokenInfo.isVirtual ? 'Virtual Account' : 'Real Account';
            }
            if (tokenList.indexOf(tokenInfo) === 0) {
                $('.account-id').attr('value', `${tokenInfo.token}`).text(`${tokenInfo.account_name}`);
                $('.account-type').text(`${prefix}`);
            } else {
                $('.login-id-list').append(
                    `<a href="#" value="${tokenInfo.token}"><li><span>${prefix}</span><div>${tokenInfo.account_name}</div></li></a>` +
                        '<div class="separator-line-thin-gray"></div>'
                );
            }
        });
    }
};
export default class View {
    constructor() {
        this.tradeInfo = new TradeInfo();
        this.chart = new Chart();
        this.log = new Log();

        this.initPromise = new Promise(resolve => {
            symbolPromise.then(() => {
                updateTokenList();
                this.blockly = new _Blockly();
                this.blockly.initPromise.then(() => {
                    this.setElementActions();
                    $('#accountLis');
                    startRealityCheck(null, $('.account-id').first().attr('value'));
                    ReactDOM.render(<Tour />, $('#tour')[0]);
                    ReactDOM.render(
                        <OfficialVersionWarning
                            show={
                                !(typeof location !== 'undefined' &&
                                    location.host === 'bot.binary.com' &&
                                    location.pathname === '/bot.html')
                            }
                        />,
                        $('#footer')[0]
                    );
                    resolve();
                });
            });
        });
    }
    setFileBrowser() {
        const readFile = (f, dropEvent = {}) => {
            const reader = new FileReader();
            reader.onload = e => this.blockly.load(e.target.result, dropEvent);
            reader.readAsText(f);
        };

        const handleFileSelect = e => {
            let files;
            let dropEvent;
            if (e.type === 'drop') {
                e.stopPropagation();
                e.preventDefault();
                files = e.dataTransfer.files;
                dropEvent = e;
            } else {
                files = e.target.files;
            }
            files = Array.from(files);
            files.forEach(file => {
                if (file.type.match('text/xml')) {
                    readFile(file, dropEvent);
                } else {
                    globalObserver.emit('ui.log.info', `${translate('File is not supported:')} ${file.name}`);
                }
            });
        };

        const handleDragOver = e => {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
        };

        const dropZone = document.body;

        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);

        $('#files').on('change', handleFileSelect);

        $('#open_btn')
            .on('click', () => {
                $.FileDialog({
                    // eslint-disable-line new-cap
                    accept       : '.xml',
                    cancelButton : 'Close',
                    dragMessage  : 'Drop files here',
                    dropheight   : 400,
                    errorMessage : 'An error occured while loading file',
                    multiple     : false,
                    okButton     : 'OK',
                    readAs       : 'DataURL',
                    removeMessage: 'Remove&nbsp;file',
                    title        : 'Load file',
                });
            })
            .on('files.bs.filedialog', ev => {
                handleFileSelect(ev.files);
            })
            .on('cancel.bs.filedialog', ev => {
                handleFileSelect(ev);
            });
    }
    setElementActions() {
        this.setFileBrowser();
        this.addBindings();
        this.addEventHandlers();
    }
    addBindings() {
        const stop = e => {
            if (e) {
                e.preventDefault();
            }
            stopRealityCheck();
            this.stop();
        };

        const logout = () => {
            logoutAllTokens().then(() => {
                updateTokenList();
                globalObserver.emit('ui.log.info', translate('Logged you out!'));
                clearRealityCheck();
            });
        };

        $('.panelExitButton').click(function onClick() {
            $(this).parent().hide();
        });

        $('#save-xml').click(() => saveDialog.save().then(arg => this.blockly.save(arg)));

        $('#undo').click(() => {
            this.blockly.undo();
        });

        $('#redo').click(() => {
            this.blockly.redo();
        });

        $('#zoomIn').click(() => {
            this.blockly.zoomOnPlusMinus(true);
        });

        $('#zoomOut').click(() => {
            this.blockly.zoomOnPlusMinus(false);
        });

        $('#rearrange').click(() => {
            this.blockly.cleanUp();
        });

        $('#loadXml').click(() => {
            $('#files').click();
        });

        $('#logout, #logout-reality-check').click(() => {
            logout();
            hideRealityCheck();
        });

        $('#continue-trading').click(() => {
            const time = parseInt($('#realityDuration').val());
            if (time >= 10 && time <= 120) {
                hideRealityCheck();
                startRealityCheck(time);
            } else {
                $('#rc-err').show();
            }
        });

        const startBot = limitations => {
            $('#stopButton').show();
            $('#runButton').hide();
            this.blockly.run(limitations);
        };

        $('#runButton').click(() => {
            const token = $('.account-id').first().attr('value');
            const tokenObj = getToken(token);
            if (tokenObj && tokenObj.hasTradeLimitation) {
                limits.getLimits().then(startBot);
            } else {
                startBot();
            }
        });

        $('#stopButton').click(e => stop(e)).hide();

        $('#resetButton').click(() => {
            this.blockly.resetWorkspace();
        });

        $('.login-id-list').on('click', 'a', e => {
            resetRealityCheck($(e.currentTarget).attr('value'));
            e.preventDefault();
            const $el = $(e.currentTarget);
            const $oldType = $el.find('li span');
            const $oldTypeText = $oldType.text();
            const $oldID = $el.find('li div');
            const $oldIDText = $oldID.text();
            const $oldValue = $el.attr('value');
            const $newType = $('.account-type');
            const $newTypeText = $newType.first().text();
            const $newID = $('.account-id');
            const $newIDText = $newID.first().text();
            const $newValue = $newID.attr('value');
            $oldType.html($newTypeText);
            $oldID.html($newIDText);
            $el.attr('value', $newValue);
            $newType.html($oldTypeText);
            $newID.html($oldIDText);
            $newID.attr('value', $oldValue);
            $('.topMenuBalance').text('\u2002');
            addBalanceForToken($('#main-account .account-id').attr('value'));
        });

        $('#login')
            .bind('click.login', () => {
                document.location =
                    'https://oauth.binary.com/oauth2/authorize?app_id=' +
                    `${getStorage('appId')}&l=${getLanguage().toUpperCase()}`;
            })
            .text('Log in');

        $('#statement-reality-check').click(() => {
            document.location = `https://www.binary.com/${getLanguage()}/user/statementws.html#no-reality-check`;
        });
        $(document).keydown(e => {
            if (e.which === 189) {
                // Ctrl + -
                if (e.ctrlKey) {
                    this.blockly.zoomOnPlusMinus(false);
                    e.preventDefault();
                }
            } else if (e.which === 187) {
                // Ctrl + +
                if (e.ctrlKey) {
                    this.blockly.zoomOnPlusMinus(true);
                    e.preventDefault();
                }
            }
        });

        $('#tradeInfoButton').click(() => {
            this.tradeInfo.open();
        });

        $('#logButton').click(() => {
            this.log.open();
        });

        $('#chartButton').click(() => {
            this.chart.open();
        });
    }
    stop() {
        this.blockly.stop();
    }
    addEventHandlers() {
        globalObserver.register('Error', error => {
            if (error.error && error.error.code === 'InvalidToken') {
                removeAllTokens();
                updateTokenList();
                this.stop();
            }
        });
    }
}

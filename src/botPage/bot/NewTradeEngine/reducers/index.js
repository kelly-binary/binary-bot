import { combineReducers } from 'redux';
import initData from './initData';
import lastTick from './lastTick';
import balance from './balance';
import contract from './contract';
import stage from './stage';
import tradeOption from './tradeOption';
import contractId from './contractId';
import proposalInfo from './proposalInfo';
import waitingForPurchase from './waitingForPurchase';

export default combineReducers({
    initData,
    lastTick,
    balance,
    stage,
    contract,
    tradeOption,
    contractId,
    proposalInfo,
    waitingForPurchase,
});

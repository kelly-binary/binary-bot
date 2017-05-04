import React from 'react';
import ReactDOM from 'react-dom';
import LogTable from './LogTable';

const tradeLogsSkel = {
  timestamp: '',
  type: '',
  message: '',
};

export default class TradeLogs {
  constructor() {
    this.log = { ...tradeLogsSkel };
    this.logCount = 0;
  }
  addLog(timestamp, type, msg) {
    this.log.timestamp = timestamp;
    this.log.type = type;
    this.log.message = msg;
    this.update(this.log);
  }
  update(log) {
    ReactDOM.render(<LogTable log={{ log }} />, $('#log')[0]);
  }
}

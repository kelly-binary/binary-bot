import React from 'react';
import ReactDOM from 'react-dom';
import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { BinaryChart } from 'binary-charts';
import { ticksService } from '../../shared';

export default class Chart {
    constructor() {
        this.chartData = [];
        this.symbol = 'R_100';
        this.chartType = 'line';
        this.pipSize = 2;
        this.dataType = 'ticks';
        this.granularity = 60;
        this.contract = null;
        this.chartComponent = null;
        this.listeners = {};
        this.updateTickListeners();
        this.addEventHandlers();
    }
    addEventHandlers() {
        globalObserver.register('bot.init', s => {
            if (this.symbol !== s) {
                this.stopTickListeners();
                this.symbol = s;
                this.pipSize = ticksService.pipSizes[s];
                this.getData(undefined, undefined, this.dataType, this.granularity);
            }
        });
    }
    stopTickListeners() {
        if (this.listeners.ohlc) {
            ticksService.stopMonitor({
                symbol     : this.symbol,
                granularity: this.granularity,
                key        : this.listeners.ohlc,
            });
        }
        if (this.listeners.tick) {
            ticksService.stopMonitor({
                symbol: this.symbol,
                key   : this.listeners.tick,
            });
        }
        this.listeners = {};
    }
    updateTickListeners() {
        return new Promise(resolve => {
            const callback = response => {
                this.chartData = response;
                resolve();
                this.updateChart();
            };

            if (this.dataType === 'candles') {
                this.listeners.ohlc = ticksService.monitor({
                    symbol     : this.symbol,
                    granularity: this.granularity,
                    callback,
                });
            } else {
                this.listeners.tick = ticksService.monitor({
                    symbol: this.symbol,
                    callback,
                });
            }
        });
    }
    getData(start, end, newDataType, newGranularity) {
        this.stopTickListeners();
        this.dataType = newDataType;
        this.granularity = newGranularity;
        return this.updateTickListeners();
    }
    getSymbol() {
        return this.symbol;
    }
    setContract(c) {
        this.contract = c;
    }
    updateChart() {
        const isMinHeight = $(window).height() <= 360;

        if (this.chartComponent && this.dataType === 'ticks' && this.contract) {
            const { chart } = this.chartComponent;
            const { dataMax } = chart.xAxis[0].getExtremes();
            const { minRange } = chart.xAxis[0].options;

            chart.xAxis[0].setExtremes(dataMax - minRange, dataMax);
        }

        this.chartComponent = ReactDOM.render(
            <BinaryChart
                className="trade-chart"
                id="trade-chart0"
                contract={
                    this.contract && this.contract.underlying === this.symbol && this.dataType === 'ticks'
                        ? this.contract
                        : null
                }
                pipSize={this.pipSize}
                shiftMode="dynamic"
                ticks={this.chartData}
                getData={this.getData.bind(this)} // eslint-disable-line no-use-before-define
                type={this.chartType}
                hideToolbar={isMinHeight}
                hideTimeFrame={isMinHeight}
                onTypeChange={type => {
                    this.chartType = type;
                }}
            />,
            $('#chart')[0]
        );
    }
}

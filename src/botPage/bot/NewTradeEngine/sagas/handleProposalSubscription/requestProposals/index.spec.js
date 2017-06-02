import createScope from '../../createScope';
import { tradeOptionToProposal } from '../../../../tools';
import requestProposals from './';

const $scope = createScope();

const { api } = $scope;

api.subscribeToPriceForContractProposal = jest.fn();

const tradeOption = {
    candleInterval: 60,
    contractTypes : ['DIGITEVEN', 'DIGITODD'],
    symbol        : 'R_100',
    amount        : 1,
    currency      : 'USD',
    duration      : 5,
    duration_unit : 't',
};

describe('requestProposals func', () => {
    it('should take tradeOption and request as many proposals as needed', () => {
        const proposals = tradeOptionToProposal(tradeOption);
        requestProposals({ $scope, tradeOption });
        expect(api.subscribeToPriceForContractProposal).toHaveBeenCalledTimes(2);
        expect(api.subscribeToPriceForContractProposal).toBeCalledWith(proposals[0]);
        expect(api.subscribeToPriceForContractProposal).toBeCalledWith(proposals[1]);
    });
});

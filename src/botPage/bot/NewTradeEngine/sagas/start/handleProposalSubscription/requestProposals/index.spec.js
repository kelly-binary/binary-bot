import createScope from '../../../createScope';
import { tradeOptionToProposal } from '../../../../../tools';
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

const proposals = tradeOptionToProposal(tradeOption);

const uuids = ['1', '2'];

describe('requestProposals func', () => {
    it('should take tradeOption and request as many proposals as needed', () => {
        requestProposals({ $scope, tradeOption, uuids });
        expect(api.subscribeToPriceForContractProposal).toHaveBeenCalledTimes(2);
        expect(api.subscribeToPriceForContractProposal).toBeCalledWith({
            ...proposals[0],
            passthrough: {
                contractType: proposals[0].contract_type,
                uuid        : uuids[0],
            },
        });
        expect(api.subscribeToPriceForContractProposal).toBeCalledWith({
            ...proposals[1],
            passthrough: {
                contractType: proposals[1].contract_type,
                uuid        : uuids[1],
            },
        });
    });
});

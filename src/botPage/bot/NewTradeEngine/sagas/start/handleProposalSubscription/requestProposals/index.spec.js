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

const uuids = ['1', '2'];
const proposalRequests = tradeOptionToProposal(tradeOption);
const proposals = proposalRequests.map((request, i) => ({ request, uuid: uuids[i] }));

describe('requestProposals func', () => {
    it('should take tradeOption and request as many proposals as needed', () => {
        requestProposals({ $scope, proposals });
        expect(api.subscribeToPriceForContractProposal).toHaveBeenCalledTimes(2);
        expect(api.subscribeToPriceForContractProposal).toBeCalledWith({
            ...proposalRequests[0],
            passthrough: {
                contractType: proposalRequests[0].contract_type,
                uuid        : uuids[0],
            },
        });
        expect(api.subscribeToPriceForContractProposal).toBeCalledWith({
            ...proposalRequests[1],
            passthrough: {
                contractType: proposalRequests[1].contract_type,
                uuid        : uuids[1],
            },
        });
    });
});

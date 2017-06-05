import createScope from '../../../createScope';
import requestProposals from './';

const $scope = createScope();

const { api } = $scope;

api.subscribeToPriceForContractProposal = jest.fn();

const proposalRequestPayloads = [{ contract_type: 'PUT' }, { contract_type: 'CALL' }];

const uuids = ['1', '2'];
const proposalRequests = proposalRequestPayloads.map((request, i) => ({ request, uuid: uuids[i] }));

describe('requestProposals func', () => {
    it('should take tradeOption and request as many proposals as needed', () => {
        requestProposals({ $scope, proposalRequests });
        expect(api.subscribeToPriceForContractProposal).toHaveBeenCalledTimes(2);
        expect(api.subscribeToPriceForContractProposal).toBeCalledWith({
            ...proposalRequestPayloads[0],
            passthrough: {
                contractType: proposalRequestPayloads[0].contract_type,
                uuid        : uuids[0],
            },
        });
        expect(api.subscribeToPriceForContractProposal).toBeCalledWith({
            ...proposalRequestPayloads[1],
            passthrough: {
                contractType: proposalRequestPayloads[1].contract_type,
                uuid        : uuids[1],
            },
        });
    });
});

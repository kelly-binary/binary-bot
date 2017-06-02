import { tradeOptionToProposal, doUntilDone } from '../../../../tools';

export default function requestProposals({ tradeOption, $scope: { api } }) {
    const proposals = tradeOptionToProposal(tradeOption);
    proposals.forEach(proposal => doUntilDone(() => api.subscribeToPriceForContractProposal(proposal)));
}

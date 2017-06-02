import { tradeOptionToProposal, doUntilDone } from '../../../../../tools';

export default function requestProposals({ tradeOption, $scope: { api }, uuids }) {
    const proposals = tradeOptionToProposal(tradeOption);
    proposals.forEach((proposal, i) =>
        doUntilDone(() =>
            api.subscribeToPriceForContractProposal({
                ...proposal,
                passthrough: {
                    uuid        : uuids[i],
                    contractType: proposal.contract_type,
                },
            })
        )
    );
}

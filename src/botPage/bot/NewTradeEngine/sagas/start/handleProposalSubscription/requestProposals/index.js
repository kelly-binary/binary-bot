import { doUntilDone } from '../../../../../tools';

export default function requestProposals({ proposals, $scope: { api }, uuids }) {
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

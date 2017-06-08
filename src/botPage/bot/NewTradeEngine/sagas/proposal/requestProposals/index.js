import { doUntilDone } from '../../../../tools';

export default function requestProposals({ proposalRequests, $scope: { api } }) {
    proposalRequests.forEach(({ request, uuid }) =>
        doUntilDone(() =>
            api.subscribeToPriceForContractProposal({
                ...request,
                passthrough: {
                    uuid,
                    contractType: request.contract_type,
                },
            })
        )
    );
}

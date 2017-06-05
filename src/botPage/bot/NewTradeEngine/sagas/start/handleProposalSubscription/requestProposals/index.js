import { doUntilDone } from '../../../../../tools';

export default function requestProposals({ proposals, $scope: { api } }) {
    proposals.forEach(({ request, uuid }) =>
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

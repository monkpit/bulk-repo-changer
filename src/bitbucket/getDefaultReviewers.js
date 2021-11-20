import restClient from '../rest/restClient'
import { stashApiUrl, stashBaseUrl } from "../../config";

export default async (project, repoSlug, sourceRefId, targetRefId) => {
    const { data: { id: repoId }} = await restClient(`${stashApiUrl}/projects/${project}/repos/${repoSlug}/`, { 'Authorization': `Bearer ${process.env.SANDBOX_TOKEN}` })
    
    const searchParams = new URLSearchParams({
        sourceRefId,
        targetRefId,
        sourceRepoId: repoId,
        targetRepoId: repoId
    });
    const defaultReviewersUrl = `${stashBaseUrl}/rest/default-reviewers/1.0/projects/${project}/repos/${repoSlug}/reviewers?${searchParams}`;

    const {data: reviewers} = await restClient(defaultReviewersUrl)
    const reviewerNames = reviewers.map(reviewer => ({ user: { name: reviewer.name } }));
    return reviewerNames;
}
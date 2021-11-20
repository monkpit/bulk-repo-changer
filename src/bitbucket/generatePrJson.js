import getDefaultReviewers from "./getDefaultReviewers";

export default async (project, repoSlug, sourceBranch, targetBranch, {title, description}) => {
    const sourceRefId = `refs/heads/${sourceBranch}`;
    const targetRefId = `refs/heads/${targetBranch}`;

    const createRefData = (id) => ({
        id,
        "repository": {
            "slug": repoSlug,
            "name": null,
            "project": {
                "key": project
            }
        }
    });

    const reviewers = await getDefaultReviewers(project, repoSlug, sourceRefId, targetRefId);
    
    return {
        title,
        description,
        "state": "OPEN",
        "open": true,
        "closed": false,
        "fromRef": createRefData(sourceRefId),
        "toRef": createRefData(targetRefId),
        "locked": false,
        reviewers
    };
}
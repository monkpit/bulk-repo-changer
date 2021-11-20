import simpleGit from 'simple-git';
import { stashApiUrl } from '../../config';
import generatePrJson from './generatePrJson';
import restClient from '../rest/restClient';


export default async (dir, project, slug, branchName, {title, description}) => {
    const git = new simpleGit(dir);
    git.push();
    const prUrl = `${stashApiUrl}/projects/${project}/repos/${slug}/pull-requests`;
    const prJson = await generatePrJson(project, slug, branchName, 'develop', {
        title,
        description,
    });

    const response = await restClient.post(prUrl, prJson);
    console.dir(response.data.links);

    return response.data.links.self[0].href;
};

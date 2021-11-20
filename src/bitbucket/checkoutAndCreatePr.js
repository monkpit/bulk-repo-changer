
import simpleGit from 'simple-git';
import createPr from './src/bitbucket/createPr.js';

export default async (dir, targetFile, { project, slug, branchName, commitMessage, title, description }) => {
    const git = simpleGit(dir);
    await git.checkoutBranch(branchName, 'develop').add(targetFile).commit(commitMessage);

    if (process.env.BULK_REPO_PUSH_ENABLED === 'true') {
        return createPr(dir, project, slug, branchName, { title, description });
    } else {
        // bail since we are not in live mode
        return dir;
    }
};
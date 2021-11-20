import simpleGit from 'simple-git';

export default async (dir) => {
    const git = simpleGit(dir);
    const gitStatus = await git.status();

    return gitStatus.modified.length !== 0;
};
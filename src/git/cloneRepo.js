import gitClient from 'simple-git';
import { basename, sep } from 'path';

export default (url, parentDir = process.cwd()) => {
    const git = gitClient(parentDir);
    return git.clone(url).then(() => {
        const slug = basename(url, '.git');
        return `${parentDir}${sep}${slug}`;
    });
}

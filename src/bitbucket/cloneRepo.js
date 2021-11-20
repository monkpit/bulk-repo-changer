import cloneToTempDir from '../git/cloneToTempDir.js';
import buildSshUrl from '../url/buildSshUrl.js';

export default (project, slug) => {
    const cloneUrl = buildSshUrl(project, slug);
    return cloneToTempDir(cloneUrl);
};
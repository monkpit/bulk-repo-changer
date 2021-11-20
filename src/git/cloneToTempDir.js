import clone from './cloneRepo';
import getTempDir from '../fs/getTempDir';
const tmp = getTempDir();

export default (url) => clone(url, tmp);
import { stashSshUrl } from '../../config/index.js';

export default (project, slug) => `${stashSshUrl}/${project}/${slug}.git`;
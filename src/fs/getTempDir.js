import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
const osTemp = tmpdir();
import { sep } from 'path';

export default () => mkdtempSync(`${osTemp}${sep}`);

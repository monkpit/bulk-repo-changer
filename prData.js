import chalk from 'chalk';
import { existsSync } from 'fs';
import { join } from 'path';

export default {
    prDetails: {
        'branchName': 'feature/branch',
        'title': 'Feature/branch - Fix bugs',
        'description': 'Fixes the bugs',
        'commitMessage': 'fix: the bugs',
    },
    'targetFile': 'package.json',
    'find': 'needle',
    'replace': 'better needle',

    predicate(dir) {
        const makePath = (subdir) => join(dir, subdir);
        const subdirExists = (subdir) => existsSync(makePath(subdir));
        const cypressExists = subdirExists('cypress');
        const srcExists = subdirExists('src');
        const shouldContinue = cypressExists && !srcExists;

        if (!shouldContinue) {
            console.log(chalk.yellow(`Predicate was not satisfied for ${dir}:`));
            console.dir({
                cypressExists,
                srcExists
            });
        }

        return shouldContinue;
    },
    'repos': {
        'test': [
            'foobar'
        ]
    }
};
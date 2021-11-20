process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

import chalk from 'chalk';
import replace from 'replace-in-files-cli/api.js';

import { join } from 'path';

import AsyncPool from './src/AsyncPool';
import cloneRepo from './src/bitbucket/cloneRepo'
import prData from './prData';
import hasModifiedFiles from './src/git/hasModifiedFiles'

const {
    prDetails,
    repos,
    targetFile,
    find: findString,
    replace: replaceString,
    predicate = () => true,
} = prData;

console.dir({ repos });

const replaceOptions = {
    find: [findString],
    replacement: replaceString,
};

const projects = Object.keys(repos);
const repoData = projects.flatMap((project) =>
    repos[project].map((slug) =>
        [project, slug]
    )
);

const asyncPool = new AsyncPool(5);

Promise.all(
    repoData.map(async ([project, slug]) => {
        await asyncPool.join(`${project}/${slug}`);

        try {
            
            const dir = await cloneRepo(project, slug);

            if (!predicate(dir)) return undefined;

            await replace(join(dir, targetFile), replaceOptions);

            if (!(await hasModifiedFiles(dir))) {
                console.log(chalk.yellow(`No files were modified in ${dir}, exiting.`));
                return undefined;
            }

            await checkoutAndCreatePr(dir, targetFile, { project, slug, ...prDetails });
        
        } catch (e) {
            
            console.log(chalk.red(`${project}/${slug}: Caught an exception.`));
            if (e?.response?.status) {
                console.log(chalk.red(`An HTTP error occurred: ${e?.response?.status}`));
            } else {
                console.log(chalk.red(`An error occurred: ${e}`));
            }

        } finally {
            
            asyncPool.leave(`${project}/${slug}`);
            
        }

        return undefined;
    })
).then(modifiedLinks => {
    console.dir({ modified: modifiedLinks.filter((x) => x) });
});


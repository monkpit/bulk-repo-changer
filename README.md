# bulk-repo-changer

Built for bitbucket server API (not cloud).

Requires `SANDBOX_TOKEN` env var to contain a [bearer token for BitBucket](https://confluence.atlassian.com/bitbucketserver/personal-access-tokens-939515499.html).

To run in live mode, set `BULK_REPO_PUSH_ENABLED=true`.

## Usage details

Edit config/index.js to add your BitBucket urls.

### prData.js

Modify the contents of `prData.js` to set the details of the PR to create across all repos.

`targetFile` is the file to inspect.

`find` is the string (or regex) to find.

`replcae` is the string to replace `find` with.

`repos` is an object with keys and arrays.

The keys are the BitBucket project names, and the arrays are arrays of repos within the projects to clone.

## Using the tool

Usage: `BULK_REPO_PUSH_ENABLED=false npm start`.

If SANDBOX_TOKEN is not set, you may need to set it as well.

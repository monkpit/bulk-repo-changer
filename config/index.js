const stashSshUrl = new URL('ssh://bitbucket.yourserver.com');
stashSshUrl.username = 'git';
stashSshUrl.port = '1234';

const stashBaseUrl = 'https://bitbucket.yourserver.com';
const stashApiUrl = `${stashBaseUrl}/rest/api/1.0`;

const asyncPoolSleep = 10000;

export {
    asyncPoolSleep,
    stashSshUrl,
    stashBaseUrl,
    stashApiUrl
};
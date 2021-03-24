const {Octokit} = require('@octokit/rest')

const octokit = new Octokit({
  auth: process.env.BOT_GITHUB_TOKEN,
})

export default octokit

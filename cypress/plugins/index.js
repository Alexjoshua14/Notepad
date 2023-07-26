const { GithubSocialLogin } = require("cypress-social-logins").plugins;

module.exports = (on, config) => {
  on("task", {
    GithubSocialLogin: GithubSocialLogin,
  });
}
import { defineConfig } from "cypress";
import { plugins } from 'cypress-social-logins';

const githubSocialLogin = plugins.GitHubSocialLogin;


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        GithubSocialLogin: githubSocialLogin
      });
    },
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
  },
});

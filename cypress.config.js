const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,
  video: true,
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      allureCypress(on, config, { resultsDir: 'allure-results' });
      return config;
    },
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pluginFile: false,
  viewportWidth: 1280,
  viewportHeight: 880,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

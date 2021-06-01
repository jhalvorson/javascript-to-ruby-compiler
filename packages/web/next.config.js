const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@js-to-ruby/compiler"]);

module.exports = withPlugins([withTM()], {
  webpack: (config) => {
    // custom webpack config
    return config;
  }
});
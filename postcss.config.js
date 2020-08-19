const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import')({
  skipDuplicates: false,
});

module.exports = {
  plugins: [
    precss,
    autoprefixer,
    postcssImport,
  ],
};

const precss = require('precss');
const postcssNested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import')({
  skipDuplicates: false,
});

module.exports = {
  plugins: [precss, autoprefixer, postcssImport, postcssNested],
};

/// Get current foldr name of the project
import { watch } from 'fs';
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist'; // we can use rootFolder
const srcFolder = './src';

export const path = {
  zip: {
   archiveFile : `${rootFolder}.zip`,
   targetSrc: `${buildFolder}/**/*.*`,
  },
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    // gulp/config/path.js
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,//.pug,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    fonts: {
      src: `${srcFolder}/fonts/`,
      scss: `${srcFolder}/scss/fonts.scss`,
      woff: `${srcFolder}/fonts/*.woff`,
      woff2: `${srcFolder}/fonts/*.woff2`,
      ttf: `${srcFolder}/fonts/*.ttf`,
      otf: `${srcFolder}/fonts/*.otf`,
    },

  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,//.pug,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    htmlPartials: `${srcFolder}/*.html`,
    php: `${srcFolder}/*.php`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: '',
}

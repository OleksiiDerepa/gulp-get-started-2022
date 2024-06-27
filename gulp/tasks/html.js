import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
//import versionNumber from "gulp-version-number";

// html
export const html = () => {
    return global.app.gulp.src(global.app.path.src.html)
        .pipe(fileInclude())//build html file from small parts to one file
        .pipe(global.app.plugins.replace(/@img\//g, 'img/'))// replace @img/ to img/
        .pipe(webpHtmlNosvg())//converting common <img src=...> to <picture> with additional using webp format
        .pipe(global.app.gulp.dest(global.app.path.build.html));
}
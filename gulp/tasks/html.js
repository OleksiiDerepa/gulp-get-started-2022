import fileInclude from "gulp-file-include";

// html
export const html = () => {
    return global.app.gulp.src(global.app.path.src.html)
        .pipe(fileInclude())//build html file from small parts to one file
        .pipe(global.app.plugins.replace(/@img\//g, 'img/'))// replace @img/ to img/
        .pipe(global.app.gulp.dest(global.app.path.build.html));
}
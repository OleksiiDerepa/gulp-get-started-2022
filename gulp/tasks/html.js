import fileInclude from "gulp-file-include";

// html
export const html = () => {
    return global.app.gulp.src(global.app.path.src.html)
        .pipe(fileInclude())
        .pipe(global.app.gulp.dest(global.app.path.build.html));
}
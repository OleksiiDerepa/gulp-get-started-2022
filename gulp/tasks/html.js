export const html = () => {
    return global.app.gulp.src(global.app.path.src.html)
        .pipe(global.app.gulp.dest(global.app.path.build.html));
}
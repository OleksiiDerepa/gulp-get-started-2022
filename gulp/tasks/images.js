import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
    return global.app.gulp.src(global.app.path.src.images)
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(global.app.plugins.newer(global.app.path.build.images))
        .pipe(webp())
        .pipe(global.app.gulp.dest(global.app.path.build.images))
        .pipe(global.app.gulp.src(global.app.path.src.images))
        .pipe(global.app.plugins.newer(global.app.path.build.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3, // 0 to 7
            verbose: true,
        }))
        .pipe(global.app.gulp.dest(global.app.path.build.images))
        .pipe(global.app.gulp.src(global.app.path.src.svg))
        .pipe(global.app.gulp.dest(global.app.path.build.images))
        .pipe(global.app.plugins.browsersync.stream());
}
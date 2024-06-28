import webpack from "webpack-stream";

export const js = () => {
    return global.app.gulp.src(global.app.path.src.js, 
            { sourcemaps: true, } //возможность создания карты исходников
        )
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(global.app.gulp.dest(global.app.path.build.js))
        .pipe(global.app.plugins.browsersync.stream());
}
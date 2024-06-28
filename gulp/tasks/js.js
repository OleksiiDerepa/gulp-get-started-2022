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
        // .pipe(app.plugins.replace(/@img\//g, '../img/'))
        // .pipe(
        //     sass({// processing scss files and transform them into css files
        //         outputStyle: 'expanded'
        //     })
        // )
        // .pipe(groupCssMediaQueries())
        // .pipe(webpcss(
        //     {
        //         webpClass: ".webp",
        //         noWebpClass: ".no-webp"
        //     }
        // ))
        // .pipe(
        //     autoprefixer({
        //         grid: true,
        //         overrideBrowserslist: ["last 3 versions"],
        //         cascade: true
        //     })
        // )
        // //uncomment if we need additional file without minification
        // .pipe(global.app.gulp.dest(global.app.path.build.css))
        // .pipe(cleanCss())
        // .pipe(
        //     rename(// rename css file extention from .css to .min.css
        //         {
        //             extname: '.min.css'
        //         }
        //     )
        // )

        .pipe(global.app.gulp.dest(global.app.path.build.js))
        .pipe(global.app.plugins.browsersync.stream());
}
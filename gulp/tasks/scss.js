// processing scss files and transform them into css files
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

// rename css file extention from .css to .min.css
import rename from 'gulp-rename'; // rename files

import cleanCss from 'gulp-clean-css'; // minify css files
import webpcss from 'gulp-webpcss'; // output webp images
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';



// scss
export const scss = () => {
    return global.app.gulp.src(global.app.path.src.scss,
        { sourcemaps: global.app.isDev, } //возможность создания карты исходников
    )
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(
            sass({// processing scss files and transform them into css files
                outputStyle: 'expanded'
            })
        )
        .pipe(
            global.app.plugins.if(
                global.app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            global.app.plugins.if(
                global.app.isBuild,
                webpcss(
                    {
                        webpClass: ".webp",
                        noWebpClass: ".no-webp"
                    }
                )
            )
        )
        .pipe(
            global.app.plugins.if(
                global.app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        //uncomment if we need additional file without minification
        .pipe(global.app.gulp.dest(global.app.path.build.css))
        .pipe(
            global.app.plugins.if(
                global.app.isBuild,
                cleanCss()
            )
        )
        .pipe(
            rename(// rename css file extention from .css to .min.css
                {
                    extname: '.min.css'
                }
            )
        )
        .pipe(global.app.gulp.dest(global.app.path.build.css))
        .pipe(global.app.plugins.browsersync.stream());
}
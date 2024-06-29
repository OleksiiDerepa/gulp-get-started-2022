import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
    return global.app.gulp.src(global.app.path.src.svgicons, {})
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    // Путь, куда сохранятся спрайт
                    sprite: `../icons/icons.svg`,
                    // Создавать страницу с перечнем иконок dist\img\stack\sprite.stack.html
                    example: true
                }
            },
        }))
        .pipe(global.app.gulp.dest(global.app.path.build.images));
}
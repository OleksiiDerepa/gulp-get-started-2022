import fs from "fs";
import fonter from "gulp-fonter-fix";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
    //looking for files with .otf extension
    return global.app.gulp.src(global.app.path.src.fonts.otf,
        { sourcemaps: true, } //возможность создания карты исходников
    )
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "FONTS-OTF",
                message: "Error: <%= error.message %>"
            })
        ))
        // convert .otf to .ttf 
        .pipe(fonter({
            formats: ['ttf']
        }))
        // move fonts to src/fonts
        .pipe(global.app.gulp.dest(global.app.path.src.fonts.src));
}

export const ttfToWoff = () => {
    //looking for files with .ttf extension
    return global.app.gulp.src(global.app.path.src.fonts.ttf, { } )
        .pipe(app.plugins.plumber(//catch errors and show them in the browser
            app.plugins.notify.onError({
                title: "FONTS-TTF",
                message: "Error: <%= error.message %>"
            })
        ))
        // convert .ttf to .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // move fonts to dist
        .pipe(global.app.gulp.dest(`${global.app.path.build.fonts}`))
        // find fonts in src/scss/base/fonts
        .pipe(global.app.gulp.src(`${global.app.path.src.fonts.ttf}`))
        // convert fonts to woff2
        .pipe(ttf2woff2())
        // save fonts in build/fonts
        .pipe(global.app.gulp.dest(`${global.app.path.build.fonts}`));
}
export const fontsStyle = () => {
    let fontsFile = `${global.app.path.src.fonts.scss}`;
    // Перевіряємо чи існують файли шрифтів
    fs.readdir(global.app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Перевіряємо чи існує файл стилів для підключення шрифтів
            if (!fs.existsSync(fontsFile)) {
                // Якщо файлу немає, створюємо його
                writeFontsFile(fontsFile, fontsFiles);
            } else {
                // Якщо файл є, виводимо повідомлення
                console.log("Файл scss/fonts/fonts.scss вже існує. Для оновлення файлу потрібно видалити його!");
            }
        } else {
            // Якщо шрифтів немає
            fs.unlink(fontsFile, cb)
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
}
function writeFontsFile(fontsFile, fontsFiles) {
    fs.writeFile(fontsFile, '', cb);
    let newFileOnly;
    for (var i = 0; i < fontsFiles.length; i++) {
        // Записуємо підключення шрифтів до файлу стилів
        let fontFileName = fontsFiles[i].split('.')[0];
        if (newFileOnly !== fontFileName) {
            let fontStyle = getFontStyle(fontFileName);
            let fontName = getFontName(fontFileName);
            let fontWeight = getFontWeightKey(fontFileName);
            fontWeight = getFontWeightValue(fontWeight);

            //fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
            fs.appendFile(
                fontsFile,
                `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`,
                cb
            );
            newFileOnly = fontFileName;
        }
    }
}

function getFontStyle(fontFileName) {
    return fontFileName.includes("-Italic")
        ? "italic"
        : "normal";
}

function cb() { }

const fontWeightKV = {
	"thin": 100,
	"hairline": 100,
	"extralight": 200,
	"ultralight": 200,
	"light": 300,
	"regular": 400,
	"medium": 500,
	"semibold": 600,
	"demibold": 600,
	"bold": 700,
	"extrabold": 800,
	"ultrabold": 800,
	"black": 900,
	"heavy": 900,
	"extrablack": 950,
	"ultrablack": 950,
}


function getFontName(fontFileName) {
    let fontName = getFontData(fontFileName, 0);

    return fontName;
}

function getFontWeightKey(fontFileName) {
    let fontWeightKey = getFontData(fontFileName, 1);

    return fontWeightKey;
}

function getFontData(fontFileName, position) {
    let fontData = fontFileName.split('-')[position]
        ? fontFileName.split('-')[position]
        : fontFileName;

    return fontData;
}

function getFontWeightValue(value) {
    let fontWeight = fontWeightKV['normal'];

    if (value) {
        value = value.toLowerCase();
        if (fontWeightKV[value]) {
            fontWeight = fontWeightKV[value];
        }
    }

    return fontWeight;
}
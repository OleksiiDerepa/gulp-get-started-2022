// Main module
import gulp from 'gulp';
// Import our path
import { path } from './gulp/config/path.js';
// Import common plugins
//import { plugins } from './gulp/config/plugins.js';

// Pass values to global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    //plugins: plugins,
}

// Import tasks
import { copy } from './gulp/tasks/copy.js';

// 1) setup watcher
// Observe changes in files
function watcher(){
    gulp.watch(path.watch.files, copy);
}

// 2) setup sequence of stepecs
// PARALLEL- ASYNC MODE for our steps
// 1 step - copy all files from source folder
const mainTasks = gulp.parallel(copy);

// 3) setup default task for dev mode
// SERIES - SERIAL MODE for our steps
// 1 step - copy all files from source folder
// 2 step - watch for changes in files
const dev = gulp.series(mainTasks, watcher);


//Run default task by default
// gulp.task('default', copy);
gulp.task('default', dev);
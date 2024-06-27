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

//Run default task by default
gulp.task('default', copy);
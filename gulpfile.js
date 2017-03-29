var es = require('event-stream')
var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var zip = require('gulp-zip')
var minimist = require('minimist')
var fs = require('fs')
var _ = require('lodash')
var path = require('path')
var mergeStream = require('merge-stream')
var strip = require('gulp-strip-comments')
var babel = require('gulp-babel')

var scripts = require('./public/app.scripts.json')

var source = {
    js: {
        src: [
            // bootstrap angular
            'public/modules/main.js',

            // main module
            'public/modules/app.js',

            // module files
            'public/modules/**/module.js',

            // other js files [controllers, services, etc.]
            'public/modules/**/!(module)*.js'
        ]
    }
}

var destinations = {
    js: 'public/build'
}
// concats angular files
gulp.task('js', function() {
    return es.merge(gulp.src(source.js.src))
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(uglify())
        .pipe(concat('app.js'))
        .on('error', swallowError)
        .pipe(gulp.dest(destinations.js))
})

gulp.task('watch', function() {
    gulp.watch(source.js.src, ['js'])
})

// builds vendor files listed in app.scripts.json
gulp.task('vendor', buildVendor)

function buildVendor() {
    let tasks = []
    _.forIn(scripts.chunks, function(chunkScripts, chunkName) {
        var paths = []
        chunkScripts.forEach(function(script) {
            var scriptFileName = scripts.paths[script]
            var scriptPath = path.join(__dirname, scriptFileName)
            if (!fs.existsSync(scriptPath)) {
                throw console.error(`Required path doesn't exist: ${scriptPath}`, script)
            }
            paths.push(scriptFileName)
        })

        tasks.push(gulp.src(paths)
            .pipe(concat(chunkName + '.js'))
            .on('error', swallowError)
            .pipe(strip())
            .pipe(uglify())
            .pipe(gulp.dest(destinations.js)))
    })
    return mergeStream(tasks)
}

gulp.task('default', ['dev'])
gulp.task('dev', ['vendor', 'js', 'watch'])

var knownOptions = {
    string: 'packageName',
    string: 'packagePath',
    default: {
        packageName: 'Package.zip',
        packagePath: path.join(__dirname, '_package')
    }
}

var options = minimist(process.argv.slice(2), knownOptions)
// This task is specifically setup for deploying to AZURE.
gulp.task('prod', ['vendor', 'js'], buildProdPackage)

function buildProdPackage() {
    var packagePaths = ['**',
        '!**/_package/**',
        '!**/typings/**',
        '!typings',
        '!_package',
        '!gulpfile.js',
        '!**/client/libs/**'
    ]

    // add exclusion patterns for all dev dependencies
    var packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))
    var devDeps = packageJSON.devDependencies

    for (var propName in devDeps) {
        var excludePattern1 = '!**/node_modules/' + propName + '/**'
        var excludePattern2 = '!**/node_modules/' + propName
        packagePaths.push(excludePattern1)
        packagePaths.push(excludePattern2)
    }

    return gulp.src(packagePaths)
        .pipe(zip(options.packageName))
        .pipe(gulp.dest(options.packagePath))
}

var swallowError = function(error) {
    console.log(error.toString())
    this.emit('end')
}

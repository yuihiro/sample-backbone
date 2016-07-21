var condition = {
    build: true
}

var path = {
    src: './src',
    src_js: './src/js',
    src_css: './src/css',
    src_img: './src/img',
    src_lib: './src/lib',
    src_template: './src/js/template',
    src_partial: './src/js/partial',

    dist: './dist',
    dist_js: './dist/js',
    dist_css: './dist/css',
    dist_img: './dist/img',
    dist_lib: './dist/lib',
    dist_template: './dist/template',
    dist_partial: './dist/partial'
}

var file = {
    entry: path.src_js + '/entry.js',
    entry_css: path.src_css + '/style.css',
    css: path.src_css + '/**/*.*',
    png: path.src_img + '/**/*.png',
    jpg: path.src_img + '/**/*.jpg',
    js: path.src_js + '/**/*.js',
    jsx: path.src_js + '/**/*.jsx',
    html: path.src + '/**/*.html',
    jsp: path.src + '/**/*.jsp',
    all: path.src_lib + '/**/*.*',
    template: path.src_template + '/**/*.hbs',
    partial: path.src_partial + '/**/*.hbs',
    bundle_js: 'bundle.js',
    bundle_css: 'bundle.css',
    vendor_js: 'vendor.js'
}

module.exports = {
    condition: condition,
    file: file,
    path: path
};


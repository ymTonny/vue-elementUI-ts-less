"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
function updateLib() {
    var cmd_yarn = 'yarn -i';
    var cmd_npm = 'npm install';
    child_process_1.spawn(cmd_yarn, {
        stdio: 'inherit',
        shell: true
    }).addListener('exit', function (code) {
        if (code !== 0) {
            child_process_1.spawn(cmd_npm, {
                stdio: 'inherit',
                shell: true
            });
        }
    });
}
(function () {
    var packagePath = path.resolve(__dirname, '../../package.json');
    var catchPath = path.resolve(__dirname, '../../.catch');
    var node_modulesPath = path.resolve(__dirname, '../../node_modules');
    var packageCatchPath = catchPath + '/package.json.catch';
    var packageJson;
    function writeCatch() {
        try {
            fs.writeFileSync(packageCatchPath, JSON.stringify(packageJson, null, ""));
        }
        catch (error) {
            console.error('package.json缓存文件写入失败');
        }
    }
    try {
        packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    }
    catch (error) {
        throw '包文件读取错误!';
    }
    if (!fs.existsSync(catchPath) || !fs.existsSync(node_modulesPath)) {
        if (!fs.existsSync(catchPath))
            fs.mkdirSync(catchPath);
        updateLib();
        writeCatch();
    }
    else if (!fs.existsSync(packageCatchPath)) {
        updateLib();
        writeCatch();
    }
    else {
        try {
            var packageCatchJson = JSON.parse(fs.readFileSync(packageCatchPath, 'utf-8'));
            var packageCatchLibs = __assign(__assign({}, packageCatchJson.dependencies), packageCatchJson.devDependencies);
            var packageLibs = __assign(__assign({}, packageJson.devDependencies), packageJson.dependencies);
            var pcjks = Object.keys(packageCatchLibs);
            var pjksStack = Object.keys(packageLibs);
            var check = true;
            while (pjksStack.length) {
                var lib = pjksStack.pop();
                if (!packageCatchLibs[lib] || packageCatchLibs[lib] !== packageLibs[lib]) {
                    console.log("update lib[" + lib + "] => { package: " + packageLibs[lib] + ", packageCatch: " + packageCatchLibs[lib] + "}");
                    check = false;
                    break;
                }
                pcjks.splice(pcjks.indexOf(lib), 1);
            }
            if (!check || pcjks.length) {
                console.log('检查到package依赖库有更新，正在执行更新操作......');
                updateLib();
                writeCatch();
            }
        }
        catch (error) {
            throw "\u7F13\u5B58\u6587\u4EF6\u683C\u5F0F\u9519\u8BEF\uFF0C\u8BF7\u5220\u9664[" + packageCatchPath + "]\u540E\u518D\u8BD5";
        }
    }
    console.log('依赖检查完毕');
})();

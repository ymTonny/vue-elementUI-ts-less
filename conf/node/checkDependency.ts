import * as fs from 'fs'
import * as path from 'path'
import { spawn } from 'child_process';

function updateLib() {
  const cmd_yarn = 'yarn -i';
  const cmd_npm = 'npm install'
  spawn(cmd_yarn, {
    stdio: 'inherit',
    shell: true
  }).addListener('exit', (code) => {
    if (code !== 0) {
      spawn(cmd_npm, {
        stdio: 'inherit',
        shell: true
      })
    }
  })
}

(function () {
  const packagePath = path.resolve(__dirname, '../../package.json');
  const catchPath = path.resolve(__dirname, '../../.catch');
  const node_modulesPath = path.resolve(__dirname, '../../node_modules');
  const packageCatchPath = catchPath + '/package.json.catch';
  let packageJson: PackageJson;

  function writeCatch() {
    try {
      fs.writeFileSync(packageCatchPath, JSON.stringify(packageJson, null, ""))
    } catch (error) {
      console.error('package.json缓存文件写入失败')
    }
  }

  try {
    packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  } catch (error) {
    throw '包文件读取错误!'
  }

  if (!fs.existsSync(catchPath) || !fs.existsSync(node_modulesPath)) {
    if (!fs.existsSync(catchPath)) fs.mkdirSync(catchPath);
    updateLib();
    writeCatch();
  }
  else if (!fs.existsSync(packageCatchPath)) {
    updateLib();
    writeCatch();
  }
  else {
    try {
      const packageCatchJson: PackageJson = JSON.parse(fs.readFileSync(packageCatchPath, 'utf-8'));
      const packageCatchLibs = { ...packageCatchJson.dependencies, ...packageCatchJson.devDependencies };
      const packageLibs = { ...packageJson.devDependencies, ...packageJson.dependencies };
      const pcjks = Object.keys(packageCatchLibs);
      const pjksStack = Object.keys(packageLibs);
      let check = true;
      while (pjksStack.length) {
        const lib = pjksStack.pop();
        if (!packageCatchLibs[lib] || packageCatchLibs[lib] !== packageLibs[lib]) {
          console.log(`update lib[${lib}] => { package: ${packageLibs[lib]}, packageCatch: ${packageCatchLibs[lib]}}`)
          check = false;
          break;
        }

        pcjks.splice(pcjks.indexOf(lib), 1);
      }

      if (!check || pcjks.length) {
        console.log('检查到package依赖库有更新，正在执行更新操作......')
        updateLib();
        writeCatch();
      }
    } catch (error) {
      throw `缓存文件格式错误，请删除[${packageCatchPath}]后再试`
    }
  }

  console.log('依赖检查完毕')
})()


export interface PackageJson {
  name: string,
  version: string,
  license: string,
  scripts: {
    [shell: string]: string;
  },
  devDependencies: {
    [lib: string]: string;
  },
  dependencies: {
    [lib: string]: string;
  }
}

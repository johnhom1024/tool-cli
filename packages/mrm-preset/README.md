# @johnhom/mrm-preset

根据 mrm 开发的项目配置文件的 preset。

包含的 preset 设置项：

- beauty

- packageJson

## 使用方式

首先全局安装`mrm`：

```
pnpm i -g mrm
# 或者
yarn global add mrm
# 或者
npm i -g mrm
```

选择你想要的配置项，例如你想要使用`packageJson`这个配置项，则在你的项目文件夹根目录下，执行以下代码：

```
mrm packageJson --preset @johnhom/mrm-preset
```

执行完成之后，`package.json`文件就会自动生成预设的字段，如果这个文件已存在，则会自动合并其中的值。

`package.json`的预设值如下：

```
{
  name: packageName,
  version: '1.0.0',
  description: '',
  author: '',
  main: 'index.js',
  files: ['index.js'],
  scripts: {},
  license: 'ISC',
  keywords: [],
  homepage: '',
  repository: '',
  publishConfig: {
    registry: 'https://registry.npmjs.org/',
    access: 'public',
  },
  dependencies: {},
  devDependencies: {},
}
```


## TODO

- [ ] prettier 的预设配置
- [ ] husky 和 commitlint 的预设配置
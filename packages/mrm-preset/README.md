# @johnhom/mrm-preset

根据 mrm 开发的项目配置文件的 preset。

包含的 preset 设置项：

- beauty

- packageJson

- commitlint

组合的task项：

- base 包含(beauty, commitlint)

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


### 使用场景

1. 当你的项目刚创建时，推荐运行以下的命令：

```
mrm base --preset @johnhom/mrm-preset
```

运行成功之后，你的项目将会自动安装以下的包：

- eslint
- prettier
- husky
- lint-staged
- @commitlint/cli
- @commitlint/config-conventional

同时会自动生成以上包相应的配置文件。

由于husky的部分钩子需要手动生成，所以你可以跑一下package.json对应的script命令：

```
# 初始化husky文件夹
npm run postinstall

# 添加pre-commit钩子
npm run husky:precommit

# 添加commit-msg的钩子
npm run husky:commitmsg
```

运行完毕之后，就可以展开手脚着手开发项目了，无需再处理项目的一些基建配置。
## 调试

将该项目clone到电脑上之后，在根目录执行：

```
pnpm dev
```

然后在mrm-preset文件夹内会生成`build`文件夹，我们拿到build文件夹的绝对路径，然后在某个项目内，执行：

```
mrm beauty --dir <build_path>
```

## TODO

- [x] prettier 的预设配置
- [x] husky 和 commitlint 的预设配置
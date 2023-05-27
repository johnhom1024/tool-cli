# mg-cli

(Auto) Merge CLI

Auto Merge CLI 是一个功能强大的命令行工具，旨在帮助开发者**自动拉取代码、合并分支、推送远程**等等操作。

它提供了一种简单而高效的方式，通过`shelljs`库调用Node.js API，实现在shell中执行git相关的操作，无需人工一步步去操作git进行分支的切换和合并，以提高工作的效率。

## 使用示例

背景：假设你完成了功能分支`feature/a`的开发，想要合并到测试分支`dev`，并且推到远程。

一般我们的操作步骤是：

```
# 切换到 dev 分支
git checkout dev

# 下拉 dev 分支的远程代码
git pull

# 合并功能分支 feature/a 到 dev
git merge feature/a

# 推送 dev 分支到远程仓库
git push
```

以下是使用Auto Merge CLI的简单示例命令:

```
# 处于 feature/a 分支中
mg-cli -t dev
```

上述会按顺序进行如下操作：

1. 在当前分支执行`git pull`
2. 获取当前分支的名称
3. 切换到目标分支`dev`
4. 执行`git pull`
5. 合并分支
6. 询问是否要推到远程
7. 询问是否要切回源分支

使用的示例图片如下：

<img src="https://github.com/johnhom1024/tool-cli/raw/main/packages/mg-cli/assets/demo1.jpg" width="500">

## 安装

全局安装

```
npm install -g @johnhom/mg-cli

# 或者
# yarn global add @johnhom/mg-cli
```

## 具体用法

```
Usage: mg-cli [options]

一个用来合并当前分支到对应分支的CLI工具

Options:
  -V, --version          output the version number
  -t, --target <string>  要合并到的目标分支
  -h, --help             display help for command
```

假设你当前项目所在的分支为：`feature/a`，你想要把这个分支合并到`dev`，并自动上传到远程仓库，你只需要执行以下命令：

```
mg-ci -t dev
```

* -t --target 指定当前分支需要合并到的目标分支

## 调试方式

使用pnpm link对当前项目链接到电脑的全局环境上，如果是在项目的根目录，则执行以下命令：

> 注意：如果你的电脑已全局安装`@johnhom/mg-cli`，则需要先删除全局包，再link

```
pnpm link --global --dir=./packages/mg-cli
```

## TODO

- [ ] 更换bin的名称为amg（缩短命令，更方便开发人员）
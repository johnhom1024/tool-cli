# mg-cli

> Typescript + commander + shelljs

一个CLI，可以自动将当前分支合并到目标分支。

## 全局安装

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
  -p, --push             合并后是否自动推送到远程
  -h, --help             display help for command
```


假设你当前项目所在的分支为：`feature/a`，你想要把这个分支合并到`dev`，并自动上传到远程仓库，你只需要执行以下命令：

```
mg-ci -t dev -p
```

> -t --target 代表当前分支需要合并到的目标分支
> -p --push   合并成功后自动将结果推送到远程仓库

执行步骤：

1. 获取当前分支的名称，假设为feature/a
2. 在当前分支拉取最新代码
3. 切换到dev分支（这里可以通过工具的参数获取，来决定最终合并到哪个分支）
4. 执行git pull的操作，将dev分支的远程代码拉取下来
5. 合并feature/a分支，如果有冲突，则提示存在冲突，请手动合并
6. 合并完成之后，自动切换回功能分支
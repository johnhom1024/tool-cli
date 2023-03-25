# tool-cli

用来聚合各种用到的工具库

## 包含工具

* mg-cli

## mg-cli

自动将当前分支合并到目标分支。

### 具体用法

```
mg-ci -t dev
```

> -t target 代表当前分支需要合并到的目标分支 默认值：`dev`

执行步骤：

1. 获取当前分支的名称，假设为feature/a
2. 在当前分支拉取最新代码
3. 切换到dev分支（这里可以通过工具的参数获取，来决定最终合并到哪个分支）
4. 执行git pull的操作，将dev分支的远程代码拉取下来
5. 合并feature/a分支，如果有冲突，则提示存在冲突，请手动合并


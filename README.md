# move-to-types

在 postinstall 的时候复制 npm 包到项目目录的父级目录的/node_modules/@types 里面

安装后修改 package.json 的 postinstall

### 重命名规则

```
@xxx/pkg-name -> @types/at_xxx_pkg-name
pkg-anme      -> @types/at_pkg-name
```

### 使用

```shell
> npm i -S move-to-types
```

# TODO

1. 生成已过去包的依赖声明, 防止 webpack 更新包的时候, 移除掉无依赖关联的包 √ (复制到项目的父级目录 node_modules/@types)
2. 非私有库支持 √

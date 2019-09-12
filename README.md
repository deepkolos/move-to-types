# move-to-types

在 postinstall 的时候把移动 npm 包到@types 里面

安装后修改 package.json 的 postinstall

### 重命名规则

```
@xxx/pkg-name -> @types/@xxx_pkg-name
```

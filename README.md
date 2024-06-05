# halo-plugin-codeInjectionPro

Halo 开源建站工具基于 Headless 编辑器 Tiptap 提供了开箱即用且可扩展的富文本编辑器，该项目希望实现一个编辑器的表情包插件，支持用户在编辑文章时插入特定的表情包  
如果您在使用本插件的过程中发现了BUG或新的建议，欢迎您在 [Github ISSUE](https://github.com/alsdhkauuhw/halo-plugin-Emoticon/issues/new) 中提出  

## ✨特性

- 在顶部工具栏添加表情包或'/'命令插入表情包  
- 支持对表情包批量操作(增加删除，导入导出，分组)
- 统计常用表情包，便捷用户的选择

## 💻使用方式

## 🤖兼容性

## 🏗开发日志

## 🧑‍💻开发环境

插件开发的详细文档请查阅：<https://docs.halo.run/developer-guide/plugin/hello-world>

```bash
git clone https://github.com/alsdhkauuhw/halo-plugin-Emotion.git
```

```bash
cd path/to/plugin-starter
```

```bash
# macOS / Linux
./gradlew pnpmInstall

# Windows
./gradlew.bat pnpmInstall
```

```bash
# macOS / Linux
./gradlew build

# Windows
./gradlew.bat build
```

运行 Halo插件  

```bash
# macOS / Linux
./gradlew haloServer

# Windows
./gradlew.bat haloServer
```

修改 Halo 配置文件：

```yaml
halo:
  plugin:
    runtime-mode: development
    fixedPluginPath:
      - "/path/to/plugin-starter"
```

## 🧑‍💼发布

## 📄参考文档

- [Halo官方文档](https://docs.halo.run)
- [Halo插件开发](https://blog.mczhengyi.top/archives/halo-plugin-dev-vditor-markdown-prepare)
- [Tiptap Docs](https://tiptap.dev/docs/editor/guide/custom-extensions#input-rules)
- [java反应式编程](https://projectreactor.io/docs/core/release/reference/#intro-reactive)

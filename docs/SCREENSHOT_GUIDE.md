# 截图添加指南

本文档指导如何为AI开发平台项目添加截图，以完善README文档的视觉效果。

## 📸 需要的截图列表

### 1. 项目Logo
- **文件名**: `docs/images/logo.png`
- **尺寸**: 200x200px
- **格式**: PNG（透明背景）
- **内容**: AI开发平台的Logo设计

### 2. 系统架构图
- **文件名**: `docs/images/architecture.png`
- **尺寸**: 800x600px
- **格式**: PNG
- **内容**: 系统整体架构示意图，展示各模块关系

### 3. 技术架构图
- **文件名**: `docs/images/tech-architecture.png`
- **尺寸**: 1000x700px
- **格式**: PNG
- **内容**: 技术栈架构图，包含前端、后端、数据库等层次

### 4. 功能界面截图

#### 需求收集界面
- **文件名**: `docs/images/requirements-collection.png`
- **尺寸**: 1200x800px
- **格式**: PNG
- **内容**: 需求收集页面，包含录音功能、文字转换、AI拆分等

#### 项目管理界面
- **文件名**: `docs/images/project-management.png`
- **尺寸**: 1200x800px
- **格式**: PNG
- **内容**: 项目管理主页面，展示项目列表、进度、团队信息

#### 代码管理界面
- **文件名**: `docs/images/code-management.png`
- **尺寸**: 1200x800px
- **格式**: PNG
- **内容**: 代码管理页面，包含Git仓库、代码审查、AI编程工具

#### 部署管理界面
- **文件名**: `docs/images/deployment.png`
- **尺寸**: 1200x800px
- **格式**: PNG
- **内容**: 部署管理页面，展示CI/CD流程、环境状态

#### 监控界面
- **文件名**: `docs/images/monitoring.png`
- **尺寸**: 1200x800px
- **格式**: PNG
- **内容**: 监控中心页面，包含性能指标、告警信息

### 5. 流程演示GIF

#### 需求收集流程
- **文件名**: `docs/images/requirement-flow.gif`
- **尺寸**: 800x600px
- **格式**: GIF
- **时长**: 10-15秒
- **内容**: 从录音到需求拆分的完整流程演示

#### 开发流程
- **文件名**: `docs/images/development-flow.gif`
- **尺寸**: 800x600px
- **格式**: GIF
- **时长**: 15-20秒
- **内容**: 从需求到代码提交的开发流程演示

#### 部署流程
- **文件名**: `docs/images/deployment-flow.gif`
- **尺寸**: 800x600px
- **格式**: GIF
- **时长**: 10-15秒
- **内容**: 自动化部署流程演示

## 🎯 截图拍摄指南

### 准备工作

1. **浏览器设置**
   - 使用Chrome浏览器
   - 设置窗口大小为1440x900
   - 隐藏书签栏和扩展图标
   - 使用无痕模式避免个人信息

2. **原型准备**
   - 打开 `prototype/index.html`
   - 确保数据已加载完成
   - 切换到对应的角色和页面

3. **截图工具**
   - 推荐使用系统自带截图工具
   - 或使用专业截图软件如Snagit
   - 确保截图清晰度和色彩准确

### 截图步骤

#### 1. 界面截图
```bash
# 1. 打开原型页面
open prototype/index.html

# 2. 切换到对应角色
# 使用右上角角色选择器

# 3. 导航到目标页面
# 点击左侧导航菜单

# 4. 等待页面完全加载
# 确保所有数据和图表都已显示

# 5. 截图
# 使用 Cmd+Shift+4 (macOS) 或 Win+Shift+S (Windows)
# 选择页面主要内容区域，避免包含浏览器边框
```

#### 2. 流程GIF录制
```bash
# 1. 使用录屏软件
# 推荐：QuickTime Player (macOS) 或 OBS Studio

# 2. 设置录制区域
# 选择浏览器窗口内容区域

# 3. 录制操作流程
# 按照业务流程进行操作演示

# 4. 转换为GIF
# 使用在线工具或ffmpeg转换
ffmpeg -i recording.mov -vf "fps=10,scale=800:600" output.gif
```

### 截图质量要求

1. **清晰度**
   - 分辨率不低于指定尺寸
   - 文字清晰可读
   - 图标和按钮清晰

2. **内容完整性**
   - 包含页面主要功能区域
   - 展示关键数据和状态
   - 避免空白或加载状态

3. **视觉效果**
   - 色彩饱和度适中
   - 对比度清晰
   - 避免反光或阴影

## 📁 文件组织

### 目录结构
```
docs/
├── images/
│   ├── logo.png                    # 项目Logo
│   ├── architecture.png            # 系统架构图
│   ├── tech-architecture.png       # 技术架构图
│   ├── requirements-collection.png # 需求收集界面
│   ├── project-management.png      # 项目管理界面
│   ├── code-management.png         # 代码管理界面
│   ├── deployment.png              # 部署管理界面
│   ├── monitoring.png              # 监控界面
│   ├── requirement-flow.gif        # 需求收集流程
│   ├── development-flow.gif        # 开发流程
│   └── deployment-flow.gif         # 部署流程
└── SCREENSHOT_GUIDE.md             # 本指南文档
```

### 命名规范
- 使用小写字母和连字符
- 文件名要有描述性
- 静态截图使用PNG格式
- 动态演示使用GIF格式

## 🔄 更新流程

1. **添加新截图**
   ```bash
   # 将截图文件放入 docs/images/ 目录
   cp screenshot.png docs/images/new-feature.png
   
   # 更新README.md中的引用
   # ![新功能](./docs/images/new-feature.png)
   ```

2. **替换现有截图**
   ```bash
   # 直接替换同名文件
   cp new-screenshot.png docs/images/existing-feature.png
   
   # Git提交更改
   git add docs/images/existing-feature.png
   git commit -m "update: 更新功能截图"
   ```

3. **批量处理**
   ```bash
   # 使用脚本批量优化图片大小
   for file in docs/images/*.png; do
     convert "$file" -resize 1200x800 "$file"
   done
   ```

## ✅ 检查清单

在提交截图前，请确认：

- [ ] 所有必需的截图文件都已添加
- [ ] 文件名符合命名规范
- [ ] 图片尺寸符合要求
- [ ] 图片质量清晰可读
- [ ] README.md中的引用路径正确
- [ ] GIF文件大小合理（< 5MB）
- [ ] 所有截图都展示了最新的界面设计

## 🛠️ 工具推荐

### 截图工具
- **macOS**: 系统自带截图 (Cmd+Shift+4)
- **Windows**: Snipping Tool 或 Snagit
- **跨平台**: LightShot, Greenshot

### 录屏工具
- **macOS**: QuickTime Player, ScreenFlow
- **Windows**: OBS Studio, Camtasia
- **在线工具**: Loom, Screencastify

### 图片处理
- **在线工具**: TinyPNG (压缩), Canva (设计)
- **桌面软件**: GIMP, Photoshop
- **命令行**: ImageMagick, ffmpeg

---

完成截图添加后，项目的README文档将更加生动和专业，有助于用户快速理解项目功能和价值。

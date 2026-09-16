# 身形预测器 PWA 部署指南 (Chinese)

## 📦 文件夹结构

```
body-predictor-pwa-zh/
├── index.html              # 主应用页面
├── manifest.json           # PWA 应用清单
├── service-worker.js       # Service Worker (离线缓存)
└── icons/
    ├── icon.svg            # SVG 矢量图标
    ├── icon-192.png        # 192x192 PNG 图标
    └── icon-512.png        # 512x512 PNG 图标
```

## 🚀 GitHub Pages 部署（拖拽上传方式）

### 方法一：直接拖拽上传（最简单）

1. 在 GitHub 上创建一个新仓库（如 `body-predictor`），选择 Public
2. 进入仓库页面，点击 **Add file** → **Upload files**
3. 将整个 `body-predictor-pwa-zh` 文件夹内的**所有文件和文件夹**拖拽到上传区域
   - ❌ 不要上传外层文件夹本身
   - ✅ 上传里面的内容：`index.html`, `manifest.json`, `service-worker.js`, `icons/`
4. 点击 **Commit changes**
5. 进入仓库的 **Settings** → **Pages**
6. 在 **Source** 中选择 `main` 分支，文件夹选择 `/ (root)`，点击 Save
7. 等待约 1 分钟，访问 `https://你的用户名.github.io/仓库名/`

### 方法二：创建子目录部署

如果你想在现有仓库的子目录中部署：

1. 在你的 GitHub 仓库中创建一个文件夹（如 `body-predictor`）
2. 将 `body-predictor-pwa-zh` 文件夹内的所有文件上传到该子目录
3. 确保 GitHub Pages 已开启
4. 访问 `https://你的用户名.github.io/仓库名/body-predictor/`

> ⚠️ **注意**：子目录部署时，`manifest.json` 中的 `start_url` 和 `scope` 使用的是相对路径 `./`，可以自动适配子目录路径。

## 📱 安卓 APP 安装

PWA 应用可以像原生 APP 一样安装到安卓手机：

### 方法一：自动安装提示
1. 用 Chrome / Edge 浏览器打开部署好的网页
2. 浏览器会自动弹出"添加到主屏幕"或"安装应用"提示
3. 点击安装即可

### 方法二：手动安装
1. 用 Chrome 浏览器打开网页
2. 点击右上角三个点（菜单）
3. 选择 **安装应用** 或 **添加到主屏幕**
4. 确认安装

### 方法三：APK 打包（进阶）
如果你需要真正的 APK 文件，可以使用以下工具将 PWA 打包：
- **PWABuilder** (https://www.pwabuilder.com/) - 微软官方工具，支持生成 Android APK
- **Bubblewrap** - Google 官方命令行工具

## 🍎 iOS PWA 安装（iPhone/iPad）

iOS 不支持自动安装提示，需要用户手动添加：

1. 用 **Safari 浏览器** 打开网页（⚠️ 必须是 Safari，Chrome 等第三方浏览器不支持）
2. 点击底部的 **分享按钮**（方形带向上箭头的图标）
3. 向下滑动，找到并点击 **添加到主屏幕**（Add to Home Screen）
4. 确认名称，点击右上角的 **添加**
5. APP 图标会出现在主屏幕上，点击即可全屏使用

### iOS 使用提示
- 首次添加后，数据存储在独立的 WebView 中，与 Safari 浏览器数据隔离
- 支持离线使用（Service Worker 缓存）
- 清除 Safari 缓存不会影响 PWA 数据
- 删除 APP 图标会清除所有本地数据

## 💾 数据存储说明

- 所有数据（个人信息、计划、记录）存储在浏览器本地的 `localStorage` 中
- 卸载 APP 或清除浏览器数据会丢失所有记录
- 数据不会上传到任何服务器
- 建议定期截图保存重要数据

## 🎯 功能说明

### 核心预测算法
- **体脂率估算**：美国海军体脂公式（US Navy Method），基于身高+颈围+腰围+臀围
- **肌肉量估算**：基于瘦体重、BMI 和围度数据的人体测量学估算
- **基础代谢**：Katch-McArdle 公式（基于瘦体重）

### 三种预测情景
| 情景 | 执行率 | 说明 |
|------|--------|------|
| 保守 | 50% | 进度较慢，适合初学者/忙碌期 |
| 正常 | 80-100% | 稳步推进，大多数人的真实水平 |
| 超预期 | 120-150% | 高度自律，适合有经验者 |

### 每日记录校准
- 记录实际体重会自动校准预测模型
- 至少需要 3 条记录且间隔 7 天以上才会启用校准
- 校准因子范围：0.3x ~ 2.0x

## 🔧 常见问题

**Q: 为什么添加到主屏幕后不是全屏？**
A: iOS 需要使用 Safari 浏览器添加。安卓确保使用 Chrome 且 PWA 正确配置。

**Q: 数据会同步吗？**
A: 目前数据只存在本地，不支持云端同步。

**Q: 预测准确吗？**
A: 预测基于科学公式和一般规律，仅供参考。每个人的身体反应不同，实际效果因人而异。

**Q: 可以调整预测参数吗？**
A: 可以通过调整"训练强度"、"饮食依从性"和情景选择来影响预测结果。

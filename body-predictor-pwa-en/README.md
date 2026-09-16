# Body Shape Predictor PWA Deployment Guide (English)

## 📦 Folder Structure

```
body-predictor-pwa-en/
├── index.html              # Main application
├── manifest.json           # PWA manifest
├── service-worker.js       # Service Worker (offline cache)
└── icons/
    ├── icon.svg            # SVG vector icon
    ├── icon-192.png        # 192x192 PNG icon
    └── icon-512.png        # 512x512 PNG icon
```

## 🚀 GitHub Pages Deployment (Drag & Drop)

### Method 1: Direct Upload (Easiest)

1. Create a new public GitHub repository (e.g., `body-predictor`)
2. On the repo page, click **Add file** → **Upload files**
3. Drag **all files and folders** from inside `body-predictor-pwa-en` into the upload area
   - ❌ Don't upload the outer folder itself
   - ✅ Upload the contents: `index.html`, `manifest.json`, `service-worker.js`, `icons/`
4. Click **Commit changes**
5. Go to repo **Settings** → **Pages**
6. Under **Source**, select `main` branch and `/ (root)` folder, then Save
7. Wait ~1 minute, then visit `https://your-username.github.io/repo-name/`

### Method 2: Subdirectory Deployment

If you want to deploy inside a subdirectory of an existing repo:

1. Create a folder in your repo (e.g., `body-predictor`)
2. Upload all files from `body-predictor-pwa-en` into that subdirectory
3. Make sure GitHub Pages is enabled
4. Visit `https://your-username.github.io/repo-name/body-predictor/`

> ⚠️ **Note**: The manifest uses relative paths (`./`) for `start_url` and `scope`, which automatically adapt to subdirectory paths.

## 📱 Android App Installation

The PWA can be installed on Android just like a native app:

### Method 1: Auto Install Prompt
1. Open the deployed webpage in Chrome / Edge browser
2. The browser will auto-show an "Add to Home Screen" or "Install app" prompt
3. Tap Install

### Method 2: Manual Install
1. Open the webpage in Chrome
2. Tap the 3-dot menu (top right)
3. Select **Install app** or **Add to Home screen**
4. Confirm installation

### Method 3: APK Packaging (Advanced)
If you need a real APK file, use these tools:
- **PWABuilder** (https://www.pwabuilder.com/) - Microsoft's official tool, generates Android APK
- **Bubblewrap** - Google's official CLI tool

## 🍎 iOS PWA Installation (iPhone/iPad)

iOS doesn't support auto-install prompts. Users must add manually:

1. Open the webpage in **Safari** (⚠️ Must be Safari — third-party browsers like Chrome don't support this)
2. Tap the **Share button** (square with upward arrow) at the bottom
3. Scroll down and tap **Add to Home Screen**
4. Confirm the name and tap **Add** in the top right
5. The app icon will appear on your home screen — tap to use in full screen

### iOS Tips
- After adding, data is stored in an isolated WebView, separate from Safari
- Offline usage is supported (via Service Worker)
- Clearing Safari cache won't affect PWA data
- Deleting the app icon clears all local data

## 💾 Data Storage

- All data (profile, plan, logs) is stored locally in browser `localStorage`
- Uninstalling the app or clearing browser data deletes all records
- Data is never uploaded to any server
- Consider taking screenshots to back up important data

## 🎯 Features

### Core Prediction Algorithms
- **Body Fat Estimation**: US Navy Method based on height + neck + waist + hip circumferences
- **Muscle Mass Estimation**: Anthropometric estimation based on lean mass, BMI, and limb circumferences
- **Basal Metabolic Rate**: Katch-McArdle formula (based on lean mass)

### Three Prediction Scenarios
| Scenario | Adherence | Description |
|----------|-----------|-------------|
| Conservative | 50% | Slower progress, good for beginners/busy periods |
| Normal | 80-100% | Steady progress, realistic for most trainees |
| Exceeding | 120-150% | High discipline, for experienced trainees |

### Daily Log Calibration
- Logging actual weight automatically calibrates the prediction model
- Requires at least 3 logs with 7+ days between first and last
- Calibration factor range: 0.3x ~ 2.0x

## 🔧 FAQ

**Q: Why isn't it full screen after adding to home screen?**
A: On iOS, use Safari. On Android, use Chrome and ensure PWA is properly configured.

**Q: Does data sync across devices?**
A: Currently data is local only. No cloud sync.

**Q: How accurate are the predictions?**
A: Predictions are based on scientific formulas and general patterns, for reference only. Individual results vary.

**Q: Can I adjust prediction parameters?**
A: Yes — adjust training intensity, diet adherence, and scenario selection to influence predictions.

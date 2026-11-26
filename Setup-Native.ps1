$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
npx create-expo-app@latest MusicifyNative --template blank
if ($LASTEXITCODE -ne 0) { throw 'Expo creation failed' }
Copy-Item native/App.js MusicifyNative/App.js -Force
Copy-Item native/app.json MusicifyNative/app.json -Force
Copy-Item native/icon.png MusicifyNative/icon.png -Force
Set-Location MusicifyNative
npx expo install expo-audio expo-document-picker expo-file-system @react-native-async-storage/async-storage
if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed' }
npx expo start

import { app, BrowserWindow, shell, nativeImage, Tray } from "electron";
import { setNativeStorageHandlers, setTimeTrexHandlers } from "electron/main/handlers";

import { release } from "node:os";
import { join } from "node:path";

import Config from "./config";

let tray: Tray;
let win: BrowserWindow;

const startWindow = () => {
    win = new BrowserWindow({
        width: Config.windowWidth,
        height: Config.windowHeight,
        title: "Desktop Timetrex",
        // icon: join(process.env.PUBLIC, "favicon.ico"),
        webPreferences: {
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            // nodeIntegration: true,
            // contextIsolation: false,
            preload: join(__dirname, "preload.js"),
        },
        frame: false,
        show: false,
        transparent: true,
    });

    win.setAlwaysOnTop(true, "pop-up-menu");

    if (process.env.VITE_DEV_SERVER_URL) {
        // electron-vite-vue#298
        win.loadURL(Config.serverUrl);
        // Open devTool if the app is not packaged
        // win.webContents.openDevTools();
    } else {
        win.loadFile(Config.indexPath);
    }

    win.on("blur", () => {
        // win.hide();
    });

    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith("https:")) shell.openExternal(url);
        return { action: "deny" };
    });
};

function startTray() {
    const trayIcon = nativeImage.createFromPath(join(process.env.PUBLIC, "timetrex-logo.png")).resize({
        height: 16,
        width: 16,
    });

    tray = new Tray(trayIcon);

    tray.addListener("click", (_e, bounds) => {
        win.setPosition(bounds.x + bounds.width / 2 - Config.windowWidth / 2, bounds.height * 1.5);
        win.show();
    });
}

const startApp = () => {
    setNativeStorageHandlers();
    setTimeTrexHandlers();
    startWindow();
    startTray();
};

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

app.dock.hide();
app.whenReady().then(startApp);

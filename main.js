// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "img/favicon.ico"),
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL("https://cbamonitor.reee.cn/monitor-elec");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  const be_mac = process.platform === "darwin";
  const template = [
    {
      label: "应用",
      submenu: [
        {
          label: "重载",
          accelerator: be_mac ? "Command+R" : "Alt+R",
          role: "reload",
        },
        {
          label: "关于",
          // accelerator: be_mac ? "Command+R" : "Alt+R",
          // role: 'about',
          click: () => {
            // win.webContents.send("fetch-version");
            // checkVersion();
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

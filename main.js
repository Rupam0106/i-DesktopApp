const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  mainMenu();
  apiCall();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//for creating menu
function mainMenu() {
  const mainMenuTemplate = [
    {
      label: "File",
      submenu: [{ role: "quit" }],
    },
    {
      label: "products",
      submenu: [{ label: "Add product" }],
    },
    {
      label: "About",
    },
    {
      label: "Contact",
    },
  ];

  const menu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(menu);
}

function apiCall() {
  const { net } = require("electron");
  const request = net.request(
    "https://ecommerce-backend-xp0v.onrender.com/api/v1/product/all"
  );
  request.on("response", (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    response.on("end", () => {
      console.log("No more data in response.");
    });
  });
  request.end();
}

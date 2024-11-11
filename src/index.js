const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //devTools: true,
    },
  });
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  mainWindow.webContents.openDevTools();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.disableHardwareAcceleration();

// Web scraping logic (crawling)
async function crawl(url) {
  try {
    console.log("\n\n\n\n\n");
    const responseX = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    const response = await responseX.text();
    // console.log(response);

    const $ = cheerio.load(response);
    const links = ["done"];
    /*  $("a").each((i, element) => {
      const href = $(element).attr("href");
      // if (href && href.startsWith("http")) {
      links.push(href);
      //}
    }); */
    $("img")?.each?.((i, element) => {
      const href = $(element).attr("src");
      console.log(element);

      // if (href && href.startsWith("http")) {
      links.push(href);
      // }
    });
    return links;
  } catch (error) {
    console.error("Error during crawl:", error);
    return ["JSON.stringify(error)", JSON.stringify(error)];
  }
}

ipcMain.handle("start-crawl", async (event, url) => {
  const links = await crawl(url);
  return links;
});

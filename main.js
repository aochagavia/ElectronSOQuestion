const { app, BrowserWindow } = require('electron');
const { performance } = require('perf_hooks');

const start = performance.now();

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.once('focus', () => {
    const focusMs = performance.now() - start;
    console.log(`Window created in ${focusMs} ms`);
  });

  win.removeMenu();
  win.loadFile('index.html').then(() => {
    win.once('ready-to-show', () => {
      const readyToShowMs = performance.now() - start;
      console.log(`Window ready to show in ${readyToShowMs} ms`);
    });
  });
}

app.whenReady().then(() => {
  const appReadyMs = performance.now() - start;
  console.log(`App ready in ${appReadyMs} ms`);
  createWindow();
})

app.on('window-all-closed', function () {
  app.quit()
})

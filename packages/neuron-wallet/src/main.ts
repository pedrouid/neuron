import { app, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import listenToChannel from './IPCChannel'
import menu from './menu'

let mainWindow: Electron.BrowserWindow | null

const { NODE_ENV } = process.env

const ENTRY = {
  DEV: 'http://localhost:3000',
  PROD: `file://${path.join(__dirname, '../../neuron-ui/build/index.html')}`,
}

listenToChannel()
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      devTools: NODE_ENV === 'development',
    },
  })

  Menu.setApplicationMenu(menu)

  mainWindow.loadURL(NODE_ENV === 'development' ? ENTRY.DEV : ENTRY.PROD)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

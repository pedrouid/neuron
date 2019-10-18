import AppController from 'controllers/app'
import initConnection from 'database/address/ormconfig'
import createSyncBlockTask from 'startup/sync-block-task/create'
import { changeLanguage } from 'utils/i18n'
import app from 'app'

const openWindow = () => {
  AppController.openWindow()
}

app.on('ready', async () => {
  changeLanguage(app.getLocale())

  await initConnection()
  createSyncBlockTask()

  openWindow()
})

app.on('activate', openWindow)

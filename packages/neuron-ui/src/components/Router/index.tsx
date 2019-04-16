import React from 'react'
import { HashRouter as Router, Route, RouteComponentProps } from 'react-router-dom'

import RoutesWithProps from './RoutesWithProps'
import Header from '../../containers/Header'
import Sidebar from '../../containers/Sidebar'
import MainContent from '../../containers/MainContent'
import Notification from '../../containers/Notification'
import WalletWizard from '../WalletWizard'
import Mnemonic from '../Mnemonic'
import WalletSubmission from '../WalletSubmission'
import WalletDetail from '../WalletDetail'
import Send from '../Transfer'
import Receive from '../Receive'
import History from '../History'
import Transaction from '../Transaction'
import Settings from '../Settings'
import General from '../Settings/General'
import Addresses from '../Addresses'
import Wallets from '../Settings/Wallets'
import Network from '../Settings/Networks'
import NetworkEditor from '../NetworkEditor'
import WalletEditor from '../WalletEditor'
import Terminal from '../Terminal'
import Prompt from '../Prompt'
import LaunchScreen from '../LaunchScreen'

import UILayer from '../../services/UILayer'
import { Routes, Channel } from '../../utils/const'

export interface CustomRoute {
  name: string
  path: string
  params?: string
  exact?: boolean
  component: React.FunctionComponent<any>
}

export const containers: CustomRoute[] = [
  {
    name: 'Header',
    path: '/',
    exact: false,
    component: Header,
  },
  {
    name: 'Sidebar',
    path: '/',
    exact: false,
    component: Sidebar,
  },
  {
    name: 'Notification',
    path: '/',
    exact: false,
    component: Notification,
  },
]

export const mainContents: CustomRoute[] = [
  {
    name: 'launch',
    path: Routes.Launch,
    exact: true,
    component: LaunchScreen,
  },
  {
    name: `Wallet`,
    path: Routes.Wallet,
    exact: false,
    component: WalletDetail,
  },
  {
    name: `Send`,
    path: Routes.Send,
    exact: false,
    component: Send,
  },
  {
    name: `Receive`,
    path: `${Routes.Receive}/:address`,
    exact: false,
    component: Receive,
  },
  {
    name: `History`,
    path: Routes.History,
    exact: false,
    component: History,
  },
  {
    name: `Transaction`,
    path: Routes.Transaction,
    params: `/:hash`,
    exact: false,
    component: Transaction,
  },
  {
    name: `Addresses`,
    path: Routes.Addresses,
    exact: false,
    component: Addresses,
  },
  {
    name: `Settings`,
    path: Routes.Settings,
    exact: false,
    component: Settings,
  },
  {
    name: `SettingsGeneral`,
    path: Routes.SettingsGeneral,
    exact: false,
    component: General,
  },
  {
    name: `SettingsWallets`,
    path: Routes.SettingsWallets,
    exact: false,
    component: Wallets,
  },
  {
    name: `SettingsNetwork`,
    path: Routes.SettingsNetworks,
    exact: true,
    component: Network,
  },
  {
    name: `NetorkEditor`,
    path: Routes.NetworkEditor,
    params: '/:id',
    exact: false,
    component: NetworkEditor,
  },
  {
    name: `WalletEditor`,
    path: Routes.WalletEditor,
    params: '/:id',
    exact: true,
    component: WalletEditor,
  },
  {
    name: `WalletWizard`,
    path: Routes.WalletWizard,
    exact: false,
    component: WalletWizard,
  },
  {
    name: `Mnemonic`,
    path: Routes.Mnemonic,
    params: `/:type`,
    exact: false,
    component: Mnemonic,
  },
  {
    name: `WalletSubmission`,
    path: Routes.WalletSubmission,
    exact: true,
    component: WalletSubmission,
  },
  {
    name: `Terminal`,
    path: Routes.Terminal,
    exact: true,
    component: Terminal,
  },
  {
    name: `Prompt`,
    path: Routes.Prompt,
    params: '/:event',
    exact: false,
    component: Prompt,
  },
]

const CustomRouter = (appProps: any) => {
  return (
    <Router>
      <Route
        render={(props: RouteComponentProps<{}>) => {
          UILayer.on(Channel.NavTo, (_e: Event, args: ChannelResponse<{ router: string }>) => {
            props.history.push(args.result.router)
          })
          return (
            <>
              <RoutesWithProps contents={containers} />
              <MainContent {...appProps}>
                <RoutesWithProps contents={mainContents} />
              </MainContent>
            </>
          )
        }}
      />
    </Router>
  )
}

CustomRouter.displayName = 'CustomRouter'

export default CustomRouter

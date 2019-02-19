import React, { useState, useEffect, useReducer } from 'react'
import ChainContext, { initChain, ICell } from '../../contexts/chain'
import WalletContext, { initWallet } from '../../contexts/wallet'

import ModalContext, {
  initModal,
  modalReducer,
  MODAL_ACTION_TYPES,
} from '../../contexts/modal'
import SettingsContext, { initSettings } from '../../contexts/settings'

import ipc, { ipcRenderer } from '../../utils/ipc'
import { IPCChannel } from '../../utils/const'

const withProviders = (Comp: React.ComponentType) => (
  props: React.Props<any>,
) => {
  const [chain, setChain] = useState(initChain)
  const [wallet, setWallet] = useState(initWallet)
  const [settings] = useState(initSettings)
  const [modal, dispatch] = useReducer(modalReducer, initModal)

  useEffect(() => {
    ipc.asw()
  }, [])

  const modalValue = {
    ...modal,
    actions: {
      hideModal: () => {
        dispatch({ type: MODAL_ACTION_TYPES.HIDE })
      },
      showModal: (ui: any) => {
        dispatch({ type: MODAL_ACTION_TYPES.SHOW, value: ui })
      },
    },
  }

  ipcRenderer.on('ASW', (_e: any, args: { status: number; result: any }) => {
    setWallet({ ...wallet, name: 'asw', wallet: args.result })
  })

  ipcRenderer.on(
    IPCChannel.SendCapacity,
    (_e: any, args: { status: number; msg: string }) => {
      console.debug(args.msg)
    },
  )

  ipcRenderer.on(
    IPCChannel.GetCellsByTypeHash,
    (_e: Event, args: { status: number; result: ICell[] }) => {
      // TODO:
      if (args.status) {
        setChain({ ...chain, cells: args.result })
      }
    },
  )
  return (
    <ModalContext.Provider value={modalValue}>
      <SettingsContext.Provider value={settings}>
        <ChainContext.Provider value={chain}>
          <WalletContext.Provider value={wallet}>
            <Comp {...props} />
          </WalletContext.Provider>
        </ChainContext.Provider>
      </SettingsContext.Provider>
    </ModalContext.Provider>
  )
}

export default withProviders

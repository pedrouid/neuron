import { createNetwork as createRemoteNetwork, updateNetwork as updateRemoteNetwork } from 'services/remote'
import { Routes } from 'utils/const'
import { failureResToNotification } from 'utils/formatters'
import { addNotification, addPopup } from './app'

import { AppActions, StateDispatch } from '../reducer'

export const createNetwork = (params: Controller.CreateNetworkParams) => (dispatch: StateDispatch, history: any) => {
  dispatch({
    type: AppActions.UpdateLoadings,
    payload: {
      network: true,
    },
  })
  createRemoteNetwork(params)
    .then(res => {
      if (res.status === 1) {
        addPopup('create-network-successfully')(dispatch)
        history.push(Routes.SettingsNetworks)
      } else {
        addNotification(failureResToNotification(res))(dispatch)
      }
    })
    .finally(() => {
      dispatch({
        type: AppActions.UpdateLoadings,
        payload: {
          network: false,
        },
      })
    })
}

export const updateNetwork = (params: Controller.UpdateNetworkParams) => (dispatch: StateDispatch, history: any) => {
  return updateRemoteNetwork(params).then(res => {
    if (res.status === 1) {
      addPopup('update-network-successfully')(dispatch)
      history.push(Routes.SettingsNetworks)
    } else {
      addNotification(failureResToNotification(res))(dispatch)
    }
    return res.status
  })
}

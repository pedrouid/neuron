import React from 'react'
import { WITHDRAW_EPOCHS } from 'utils/const'
import styles from './compensationProgressBar.module.scss'

export interface CompensationProgressBarProps {
  pastEpochs: number
  style?: object
}

const CompensationProgressBar = ({ pastEpochs, style }: CompensationProgressBarProps) => {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.indicator} style={{ left: `calc(${(100 * pastEpochs) / WITHDRAW_EPOCHS}% - 5px)` }} />
      <progress className={styles.progress} max={WITHDRAW_EPOCHS} value={pastEpochs} />
    </div>
  )
}

CompensationProgressBar.displayName = 'CompensationProgressBar'

export default CompensationProgressBar

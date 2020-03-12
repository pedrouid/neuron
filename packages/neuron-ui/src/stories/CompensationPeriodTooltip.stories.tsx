import React from 'react'
import { storiesOf } from '@storybook/react'
import CompensationPeriodTooltip, { CompensationPeriodTooltipProps } from 'components/CompensationPeriodTooltip'

const stories = storiesOf('Compensation Period Tooltip', module)

const props: { [index: string]: CompensationPeriodTooltipProps } = {
  normalStart: {
    currentEpochTimestamp: Date.now(),
    currentEpochValue: 0,
    endEpochValue: 180,
  },
  normalEnd: {
    currentEpochTimestamp: Date.now(),
    currentEpochValue: 138,
    endEpochValue: 180,
  },
  suggestedStart: {
    currentEpochTimestamp: Date.now(),
    currentEpochValue: 139,
    endEpochValue: 180,
  },
  suggestedEnd: {
    currentEpochTimestamp: Date.now(),
    currentEpochValue: 174,
    endEpochValue: 180,
  },
  requestedStart: {
    currentEpochTimestamp: Date.now(),
    currentEpochValue: 175,
    endEpochValue: 180,
  },
}

Object.keys(props).forEach(key => {
  stories.add(key, () => {
    return <CompensationPeriodTooltip {...props[key]} />
  })
})

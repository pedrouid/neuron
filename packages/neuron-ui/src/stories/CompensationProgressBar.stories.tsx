import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, withKnobs } from '@storybook/addon-knobs'
import CompensationProgressBar, { CompensationProgressBarProps } from 'components/CompensationProgressBar'

const stories = storiesOf('Compensation Progress Bar', module)

const props: { [index: string]: CompensationProgressBarProps } = {
  Normal: {
    pastEpochs: 0,
  },
  Suggested: {
    pastEpochs: 139,
  },
  Requested: {
    pastEpochs: 175,
  },
  End: {
    pastEpochs: 180,
  },
}

Object.keys(props).forEach(key => {
  stories.add(key, () => {
    return <CompensationProgressBar {...props[key]} style={{ width: '300px' }} />
  })
})

stories.addDecorator(withKnobs()).add('Knob', () => {
  return <CompensationProgressBar pastEpochs={number('Past Epochs', 0)} style={{ width: '300px' }} />
})

import React from 'react'
import { createShallow } from 'material-ui/test-utils'
import App from './App'

const shallow = createShallow()

it('renders without crashing', () => {
  const wrapper = shallow(<App />)
});

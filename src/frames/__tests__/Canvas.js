import React from 'react'
import App from '../Canvas'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
})

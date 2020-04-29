import React from 'react'
import { shallow } from 'enzyme'
import Pagination from '../Pagination.container'

describe('testing pagination component', () => {
  it('should render pagination component with calculated buttons', () => {
    const wrapper = shallow(
      <Pagination
        endPageNumber={10}
        currentPageNumber={5}
        numbersVisibleLeft={2}
        numbersVisibleRight={2}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import { Pagination } from '../Pagination'

describe('testing pagination component', () => {
  it('should render pagination component with default navlink buttons', () => {
    const wrapper = shallow(<Pagination pageRange={[1, 2, 3, 4, 5]} />)

    expect(wrapper).toMatchSnapshot()
  })
  it('should render button based pagination component', () => {
    const wrapper = shallow(
      <Pagination pageRange={[1, 2, 3, 4, 5]} worksWithStateInsteadOfRoutes />
    )

    expect(wrapper).toMatchSnapshot()
  })
  it('should render handle button press', () => {
    const mockFn = jest.fn(() => true)

    const wrapper = shallow(
      <Pagination
        pageRange={[1, 2, 3, 4, 5]}
        worksWithStateInsteadOfRoutes
        onClickUpdatePageState={mockFn}
      />
    )
    const buttons = wrapper.find('button')

    buttons.at(2).simulate('click')

    expect(mockFn).toHaveBeenCalledTimes(1)

    buttons.at(3).simulate('click')

    expect(mockFn).toHaveBeenCalledTimes(2)
  })
})

import React, { createRef } from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import SearchCriteria from '../SearchCriteria'

describe('tests for SearchCriteria', () => {
  it('should render SearchCriteria component, with default settings', () => {
    const wrapper = shallow(<SearchCriteria />)

    expect(wrapper).toMatchSnapshot()

    // by defualt, no checked checkboxes
    expect(
      wrapper
        .find('ForwardRef')
        .findWhere((wrpr) => wrpr.prop('inputtype') === 'checkbox' && wrpr.prop('checked') === true)
    ).toHaveLength(0)
  })

  it('should render SearchCriteria for text field', () => {
    const searchRef = createRef()

    const wrapper = shallow(<SearchCriteria type="text" ref={searchRef} />)

    // has it rendered Input type 'text', where search query will be typed?
    expect(
      wrapper.find('ForwardRef').findWhere((wrpr) => wrpr.prop('type') === 'text')
    ).toHaveLength(1)
  })

  it('should render SearchCriteria for text field', () => {
    const searchRef = createRef()

    const wrapper = shallow(<SearchCriteria type="text" ref={searchRef} />)
    const inputs = wrapper.find('ForwardRef')

    // has it rendered Input type 'text', where search query will be typed?
    expect(
      inputs.findWhere((wrpr) => wrpr.prop('type') === 'text' && wrpr.prop('inputtype') === 'input')
    ).toHaveLength(1)

    // should have 2 cehckboxes (match, contains) for this type of search
    expect(
      inputs.findWhere(
        (wrpr) => wrpr.prop('name') === 'match' && wrpr.prop('inputtype') === 'checkbox'
      )
    ).toHaveLength(1)
    expect(
      inputs.findWhere(
        (wrpr) => wrpr.prop('name') === 'contain' && wrpr.prop('inputtype') === 'checkbox'
      )
    ).toHaveLength(1)
  })

  it('should render SearchCriteria for text field with checked checkbox from start', () => {
    const searchRef = createRef()

    const wrapper = shallow(<SearchCriteria type="text" ref={searchRef} defaultChecked="match" />)

    const inputs = wrapper.find('ForwardRef')

    // the checkbox "match" is checked by default
    expect(
      inputs.findWhere(
        (wrpr) =>
          wrpr.prop('name') === 'match' &&
          wrpr.prop('inputtype') === 'checkbox' &&
          wrpr.prop('checked') === true
      )
    ).toHaveLength(1)

    // other checkbox is not checked
    expect(
      inputs.findWhere(
        (wrpr) =>
          wrpr.prop('name') === 'contain' &&
          wrpr.prop('inputtype') === 'checkbox' &&
          wrpr.prop('checked') === true
      )
    ).toHaveLength(0)
  })

  it('should render SearchCriteria for numeric field', () => {
    const searchRef = createRef()

    const wrapper = shallow(<SearchCriteria type="number" ref={searchRef} />)
    const inputs = wrapper.find('ForwardRef')

    // has it rendered Input type 'text', where search query will be typed?
    expect(
      inputs.findWhere(
        (wrpr) => wrpr.prop('type') === 'number' && wrpr.prop('inputtype') === 'input'
      )
    ).toHaveLength(1)

    // should have 5 checkboxes (e, gt, lt, gte, lte) for this type of search
    expect(
      inputs.findWhere((wrpr) => wrpr.prop('name') === 'e' && wrpr.prop('inputtype') === 'checkbox')
    ).toHaveLength(1)
    expect(
      inputs.findWhere(
        (wrpr) => wrpr.prop('name') === 'gt' && wrpr.prop('inputtype') === 'checkbox'
      )
    ).toHaveLength(1)
    expect(
      inputs.findWhere(
        (wrpr) => wrpr.prop('name') === 'gte' && wrpr.prop('inputtype') === 'checkbox'
      )
    ).toHaveLength(1)
    expect(
      inputs.findWhere(
        (wrpr) => wrpr.prop('name') === 'lt' && wrpr.prop('inputtype') === 'checkbox'
      )
    ).toHaveLength(1)
    expect(
      inputs.findWhere(
        (wrpr) => wrpr.prop('name') === 'lte' && wrpr.prop('inputtype') === 'checkbox'
      )
    ).toHaveLength(1)
  })

  it('should render SearchCriteria for number field with checked checkbox from start', () => {
    const searchRef = createRef()

    const wrapper = shallow(<SearchCriteria type="number" ref={searchRef} defaultChecked="e" />)

    const inputs = wrapper.find('ForwardRef')

    // the checkbox "match" is checked by default
    expect(
      inputs.findWhere(
        (wrpr) =>
          wrpr.prop('name') === 'e' &&
          wrpr.prop('inputtype') === 'checkbox' &&
          wrpr.prop('checked') === true
      )
    ).toHaveLength(1)

    // other checkboxes are not checked
    expect(
      inputs.findWhere(
        (wrpr) =>
          wrpr.prop('name') === 'gt' &&
          wrpr.prop('inputtype') === 'checkbox' &&
          wrpr.prop('checked') === true
      )
    ).toHaveLength(0)
    expect(
      inputs.findWhere(
        (wrpr) =>
          wrpr.prop('name') === 'lt' &&
          wrpr.prop('inputtype') === 'checkbox' &&
          wrpr.prop('checked') === true
      )
    ).toHaveLength(0)
    expect(
      inputs.findWhere(
        (wrpr) =>
          wrpr.prop('name') === 'gte' &&
          wrpr.prop('inputtype') === 'checkbox' &&
          wrpr.prop('checked') === true
      )
    ).toHaveLength(0)
    expect(
      inputs.findWhere(
        (wrpr) =>
          wrpr.prop('name') === 'lte' &&
          wrpr.prop('inputtype') === 'checkbox' &&
          wrpr.prop('checked') === true
      )
    ).toHaveLength(0)
  })

  it('should allow parent to have access to search input though ref', () => {
    const searchRef = createRef()

    const wrapper = mount(<SearchCriteria type="text" ref={searchRef} />)
    const inputs = wrapper.find('input')
    const textInput = inputs.findWhere(
      (wrpr) => wrpr.prop('type') === 'text' && wrpr.prop('inputtype') === 'input'
    )

    // ref has been set to something besides its defauult value of null
    expect(searchRef.current).toBeTruthy()

    // no search option since there is no checkbox selected
    expect(searchRef.current.searchOption).toEqual(null)

    // ref to input search has been set
    expect(searchRef.current.search).toBeTruthy()

    // the ref to text input matches indeed with the text input elem, thus allowing us to get value from input at any moment with .value
    expect(textInput.instance()).toEqual(searchRef.current.search)
  })

  it('should allow parent to have a way to know which is the checked checkbox', () => {
    const searchRef = createRef()

    const wrapper = mount(<SearchCriteria type="text" ref={searchRef} defaultChecked="contain" />)

    // ref has been set to something besides its defauult value of null
    expect(searchRef.current).toBeTruthy()

    // search option should equal to contain since it is default checked checkbox
    expect(searchRef.current.searchOption).toEqual('contain')
  })

  it('should handle clicking a checkbox and changing the currently checked checkbox from SearchCriteria', () => {
    const searchRef = createRef()

    const wrapper = mount(<SearchCriteria type="text" ref={searchRef} defaultChecked="contain" />)
    // search option should equal to contain since it is default checked checkbox
    expect(searchRef.current.searchOption).toEqual('contain')

    act(() => {
      wrapper
        .findWhere((wrpr) => wrpr.prop('name') === 'match' && wrpr.prop('inputtype') === 'checkbox')
        .prop('onChange')({ target: { checked: true } })
    })

    // searchOption should be match after that has been clicked!
    expect(searchRef.current.searchOption).toEqual('match')

    act(() => {
      wrapper
        .findWhere(
          (wrpr) => wrpr.prop('name') === 'contain' && wrpr.prop('inputtype') === 'checkbox'
        )
        .prop('onChange')({ target: { checked: true } })
    })

    expect(searchRef.current.searchOption).toEqual('contain')
  })

  it('should always have one checkbox checked', () => {
    const searchRef = createRef()

    const wrapper = mount(
      <SearchCriteria type="text" ref={searchRef} defaultChecked="contain" alwaysOneChecked />
    )

    expect(searchRef.current.searchOption).toEqual('contain')

    act(() => {
      wrapper
        .findWhere(
          (wrpr) => wrpr.prop('name') === 'contain' && wrpr.prop('inputtype') === 'checkbox'
        )
        .prop('onChange')({ target: { checked: false } })
    })

    expect(searchRef.current.searchOption).toEqual('contain')
  })

  it('should allow for no checkboxes checked', () => {
    const searchRef = createRef()

    const wrapper = mount(<SearchCriteria type="text" ref={searchRef} defaultChecked="contain" />)

    expect(searchRef.current.searchOption).toEqual('contain')

    act(() => {
      wrapper
        .findWhere(
          (wrpr) => wrpr.prop('name') === 'contain' && wrpr.prop('inputtype') === 'checkbox'
        )
        .prop('onChange')({ target: { checked: false } })
    })

    expect(searchRef.current.searchOption).toEqual(null)
  })
})

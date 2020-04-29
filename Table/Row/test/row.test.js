import React from 'react'
import { shallow } from 'enzyme'

import Row from '../Row'

describe('testing Row component', () => {
  it('should render Row', () => {
    const rowCells = [
      {
        cellValue: 'hello world',
      },
    ]

    const wrapper = shallow(
      <Row
        rowCells={rowCells}
        pageName="somePageModifier"
        uniqueRowId="uniqueRowId"
        uniqueRowId="uniqueRowId"
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should render Row without withAction class', () => {
    const rowCells = [
      {
        cellValue: 'hello world',
      },
    ]

    const wrapper = shallow(
      <Row
        rowCells={rowCells}
        withActions={false}
        pageName="somePageModifier"
        uniqueRowId="uniqueRowId"
      />
    )

    expect(wrapper.hasClass('withActions')).toEqual(false)
  })

  it('should render Row without pageName specific class', () => {
    const rowCells = [
      {
        cellValue: 'hello world',
      },
    ]

    const wrapper = shallow(
      <Row rowCells={rowCells} pageName="somePageModifier" uniqueRowId="uniqueRowId" />
    )

    expect(wrapper.hasClass('somePageModifier')).toEqual(true)
  })

  it('should render Row with default cell value', () => {
    const rowCells = [
      {
        cellValue: 'hello world',
      },
    ]

    const wrapper = shallow(
      <Row rowCells={rowCells} pageName="somePageModifier" uniqueRowId="uniqueRowId" />
    )

    //test default label when misconfigured cell
    expect(wrapper.childAt(0).text()).toEqual('-')
  })

  describe('testing for text type cells', () => {
    it('should render Row with text cell type', () => {
      const rowCells = [
        {
          cellValue: 'hello world',
          cellType: 'text',
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )

      //test default label when configured cell
      expect(wrapper.childAt(0).text()).toEqual('hello world')
    })

    it('should render Row with text cell type wiht optional class', () => {
      const rowCells = [
        {
          cellValue: 'hello world',
          cellType: 'text',
          centered: true,
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )
      const rowCell = wrapper.childAt(0)

      //test default label when configured cell
      expect(rowCell.hasClass('centeredCellContents')).toEqual(true)
    })

    it('should render Ropw with text cell type wiht optional click function', () => {
      const mockFunc = jest.fn(() => 'works')
      const rowCells = [
        {
          cellValue: 'hello world',
          cellType: 'text',
          onClick: mockFunc,
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )
      const rowCell = wrapper.childAt(0)
      rowCell.simulate('click')

      //test default label when configured cell
      expect(mockFunc).toHaveBeenCalled()
    })
  })

  describe('tests for Icon cell type', () => {
    //do tests for click, opt classes? They are the same as text, just contents change. If we should, put them here! Otherwise, remove the describe block?

    it('should render Row with Icon cell type', () => {
      const rowCells = [
        {
          cellValue: 'check',
          cellType: 'icon',
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )

      expect(wrapper.find('div[icon="check"]')).toHaveLength(1)
      expect(wrapper.text()).toEqual('<Icon />')
    })
  })

  describe('testing Row rendering link type cells', () => {
    it('should render Row with link cell type', () => {
      const rowCells = [
        {
          cellValue: {
            path: 'someRoute',
            label: 'redirectMe',
          },
          cellType: 'link',
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )
      const rowCell = wrapper.childAt(0)

      expect(rowCell.hasClass('urlDiv')).toEqual(true)
    })

    it('should handle wrong obj format for link', () => {
      const rowCells = [
        {
          cellValue: {
            wrong: 'redirectMe',
          },
          cellType: 'link',
        },
      ]

      //@TO DO: handle wrong prop types?! https://medium.com/shark-bytes/type-checking-with-prop-types-in-jest-e0cd0dc92d5
      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )

      //dont render Link if
      expect(wrapper.children()).toHaveLength(0)
    })
  })

  describe('test Row rendering with date cells', () => {
    it('should render Row with date cell type', () => {
      const rowCells = [
        {
          cellValue: new Date('1990'),
          cellType: 'date',
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )
      const rowCell = wrapper.childAt(0)

      expect(rowCell.hasClass('dateDiv')).toEqual(true)
      expect(rowCell.children()).toHaveLength(2)
      expect(rowCell.childAt(0).childAt(0).text()).toEqual('1st Jan 1990')
    })

    it('should render Row with date cell type and string date', () => {
      const rowCells = [
        {
          cellValue: '1/1/1990',
          cellType: 'date',
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )
      const rowCell = wrapper.childAt(0)

      expect(rowCell.hasClass('dateDiv')).toEqual(true)
      expect(rowCell.children()).toHaveLength(2)
      expect(rowCell.childAt(0).childAt(0).text()).toEqual('1st Jan 1990')
    })

    it('should render Row with date cell type and timestamp date', () => {
      const rowCells = [
        {
          cellValue: 631152000000,
          cellType: 'date',
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )
      const rowCell = wrapper.childAt(0)

      expect(rowCell.hasClass('dateDiv')).toEqual(true)
      expect(rowCell.children()).toHaveLength(2)
      expect(rowCell.childAt(0).childAt(0).text()).toEqual('1st Jan 1990')
    })

    it('should render Rowwith date cell type and fail due to invalid date', () => {
      const rowCells = [
        {
          cellValue: 'asd',
          cellType: 'date',
        },
      ]

      const wrapper = shallow(
        <Row pageName="somePageModifier" uniqueRowId="uniqueRowId" rowCells={rowCells} />
      )

      //test that the rendered row's cell has no contents, since return null when date is invalid
      expect(wrapper.children()).toHaveLength(0)
    })
  })
})

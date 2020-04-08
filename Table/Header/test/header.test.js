import React from 'react'
import { shallow } from 'enzyme'

import Header from '../Header'

describe('testing Table component conditional renders for header', () => {

    it('should render header component', () => {
        const headerCells = [
            {
                label: 'columnHeader'
            }
        ]
        
        const wrapper = shallow(<Header headerCells={headerCells} pageName="somePageModifier" />)
        
        expect(wrapper).toMatchSnapshot()
    }) 

    it('should render multiple columns/headerCells with proper label values', () => {
        const headerCells = [
            {
                label: 'columnHeader1'
            },
            {
                label: 'columnHeader2',
            },            
            {
                label: 'columnHeader3',
            },
        ]
        
        const wrapper = shallow(<Header headerCells={headerCells} pageName="somePageModifier" />)

        //3 columns/headerCells
        expect(wrapper.children()).toHaveLength(3)

        //test label content
        expect(wrapper.childAt(0).find('p').text()).toEqual('columnHeader1')
        expect(wrapper.childAt(1).find('p').text()).toEqual('columnHeader2')
        expect(wrapper.childAt(2).find('p').text()).toEqual('columnHeader3')
    })

    it('should render just a header with label, no optional classes', () => {
        const headerCells = [
            {
                label: 'columnHeader'
            }
        ]
        
        const wrapper = shallow(<Header headerCells={headerCells} pageName="somePageModifier" />)
        const headerCell = wrapper.childAt(0)

        //test their unique display related classes
        expect(headerCell.hasClass('centered')).toEqual(false)
        expect(headerCell.hasClass('withIcon')).toEqual(false)
    })

    it('should render just a header with label, and optional class "centered"', () => {
        const headerCells = [
            {
                label: 'columnHeader',
                centered: true
            }
        ]
        
        const wrapper = shallow(<Header headerCells={headerCells} pageName="somePageModifier" />)
        const centeredHeaderCell = wrapper.childAt(0)

        expect(centeredHeaderCell.hasClass('centered')).toEqual(true)
        expect(centeredHeaderCell.hasClass('withIcon')).toEqual(false)
    })

    it('should render just a header with label, and optional class "withIcon"', () => {
        const headerCells = [
            {
                label: 'columnHeader',
                withIcon: true
            }
        ]
        
        const wrapper = shallow(<Header headerCells={headerCells} pageName="somePageModifier" />)
        const withIconHeaderCell = wrapper.childAt(0)

        expect(withIconHeaderCell.hasClass('centered')).toEqual(false)
        expect(withIconHeaderCell.hasClass('withIcon')).toEqual(true)
        expect(withIconHeaderCell.find('Icon')).toHaveLength(1)
    })

    it('should render just a header with label, and optional class "withIcon" and "centered', () => {
        const headerCells = [
            {
                label: 'columnHeader',
                centered: true,
                withIcon: 'sort'
            },    
        ]
        
        const wrapper = shallow(<Header headerCells={headerCells} pageName="somePageModifier" />)
        const headerCell = wrapper.childAt(0)

        expect(headerCell.hasClass('centered')).toEqual(true)
        expect(headerCell.hasClass('withIcon')).toEqual(true)
    })

    it('should render jsut a header with label, that is clickable and can run func', () => {
        const mockFunc = jest.fn(() => "works")

        const headerCells = [
            {
                label: 'columnHeader',
                onClick: mockFunc
            }
        ]
        
        const wrapper = shallow(<Header headerCells={headerCells} pageName="somePageModifier" />)
        const headerCell = wrapper.childAt(0)
        headerCell.simulate('click')
        
        expect(mockFunc).toHaveBeenCalled()
    })
})
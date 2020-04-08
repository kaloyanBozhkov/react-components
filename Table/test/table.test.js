import React from 'react'
import { shallow } from 'enzyme'

import Table from 'Collections/Table/Table'

describe('testing Table component rendering', () => {

    it('should render table component not configured properly msg, without any props ', () => {
        const wrapper = shallow(<Table headerCells={[]} pageName="someName" />)

        expect(wrapper).toMatchSnapshot()
    })


    //maybe we dont need this second snapshot test?
    it('should render table component when configured properly ', () => {
        const headers = [
            {
                label: 'columnHeader'
            }
        ]

          //arr of rows
          const rows = [
            [
                {
                    cellValue: 'hello world',
                    uniqueRowId: 2
                }
            ],
            [
                {
                    cellValue: 'hello world2',
                    uniqueRowId: 4
                }
            ]
        ]
        const wrapper = shallow(<Table  headerCells={headers} rows={rows} pageName="someName"  />)

        expect(wrapper).toMatchSnapshot()
    })
})


describe('testing table rendering rows', () => {
    it('should render table component without rows', () => {
        const headers = [
            {
                label: 'columnHeader'
            }
        ]

        const wrapper = shallow(<Table headerCells={headers} pageName="somePageModifier" />)
        

        //row container should have 'emptymessage' attribute which styles contents when no rows to show
        expect(wrapper.find('.tableBody[emptymessage]')).toHaveLength(1)
        expect(wrapper.find('Row')).toHaveLength(0)
    })

    it('should render table component with a single row & column', () => {
        const headers = [
            {
                label: 'columnHeader'
            }
        ]

        //arr of rows
        const rows = [
            [
                {
                    cellValue: 'hello world',
                    uniqueRowId: 1
                }
            ]
        ]

        const wrapper = shallow(<Table headerCells={headers} pageName="somePageModifier" rows={rows} />)

        expect(wrapper.find('.tableBody[emptymessage]')).toHaveLength(0)
        expect(wrapper.find('Row')).toHaveLength(1)

        //count rows created
        expect(wrapper.find('.tableBody').children()).toHaveLength(1)
    })

    it('should render table component with 2 rows', () => {
        const headers = [
            {
                label: 'columnHeader'
            }
        ]

        //arr of rows
        const rows = [
            [
                {
                    cellValue: 'hello world',
                    uniqueRowId: 2
                }
            ],
            [
                {
                    cellValue: 'hello world2',
                    uniqueRowId: 4
                }
            ]
        ]

        const wrapper = shallow(<Table headerCells={headers} pageName="somePageModifier" rows={rows} />)

        //count rows created
        expect(wrapper.find('Row')).toHaveLength(2)
    })
})

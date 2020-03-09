import React from 'react'
import { shallow, mount } from 'enzyme'

import Table from 'Collections/Table/Table'

describe('testing Table component rendering', () => {
    it('should render table component not configured properly msg, without any props ', () => {
        const wrapper = shallow(<Table columnHeaders={[]} pageName="someName" />)

        expect(wrapper).toMatchSnapshot()
    })


    //maybe we dont need this second snapshot test?
    it('should render table component when configured properly ', () => {
        const headers = [
            {
                label: 'columnHeader'
            }
        ]
        const wrapper = shallow(<Table  columnHeaders={headers} pageName="someName"  />)

        expect(wrapper).toMatchSnapshot()
    })
})

describe('testing Table component conditional renders for header', () => {
    it('should render multiple columns/headers with proper label values', () => {
        const headers = [
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
        
        const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" />)

        //3 columns/headers
        expect(wrapper.find('.tableHeader').children()).toHaveLength(3)

        //test label content
        expect(wrapper.find('.tableHeader').childAt(0).find('p').text()).toEqual('columnHeader1')
        expect(wrapper.find('.tableHeader').childAt(1).find('p').text()).toEqual('columnHeader2')
        expect(wrapper.find('.tableHeader').childAt(2).find('p').text()).toEqual('columnHeader3')
    })

    it('should render just a header with label, no optional classes', () => {
        const headers = [
            {
                label: 'columnHeader'
            }
        ]
        
        const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" />)
        const headerCell = wrapper.find('.tableHeader').childAt(0)

        //test their unique display related classes
        expect(headerCell.hasClass('centered')).toEqual(false)
        expect(headerCell.hasClass('withIcon')).toEqual(false)
    })

    it('should render just a header with label, and optional class "centered"', () => {
        const headers = [
            {
                label: 'columnHeader',
                centered: true
            }
        ]
        
        const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" />)
        const centeredHeaderCell = wrapper.find('.tableHeader').childAt(0)

        expect(centeredHeaderCell.hasClass('centered')).toEqual(true)
        expect(centeredHeaderCell.hasClass('withIcon')).toEqual(false)
    })

    it('should render just a header with label, and optional class "withIcon"', () => {
        const headers = [
            {
                label: 'columnHeader',
                withIcon: true
            }
        ]
        
        const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" />)
        const withIconHeaderCell = wrapper.find('.tableHeader').childAt(0)

        expect(withIconHeaderCell.hasClass('centered')).toEqual(false)
        expect(withIconHeaderCell.hasClass('withIcon')).toEqual(true)
        expect(withIconHeaderCell.find('Icon')).toHaveLength(1)
    })

    it('should render just a header with label, and optional class "withIcon" and "centered', () => {
        const headers = [
            {
                label: 'columnHeader',
                centered: true,
                withIcon: 'sort'
            },    
        ]
        
        const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" />)
        const headerCell = wrapper.find('.tableHeader').childAt(0)

        expect(headerCell.hasClass('centered')).toEqual(true)
        expect(headerCell.hasClass('withIcon')).toEqual(true)
    })

    it('should render jsut a header with label, that is clickable and can run func', () => {
        const mockFunc = jest.fn(() => "works")

        const headers = [
            {
                label: 'columnHeader',
                onClick: mockFunc
            }
        ]
        
        const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" />)
        const headerCell = wrapper.find('.tableHeader').childAt(0)
        headerCell.simulate('click')
        
        expect(mockFunc).toHaveBeenCalled()
    })
})

describe('testing Table component rows', () => {
    describe('testing row rendering', () => {

        it('should render table component without rows', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" />)
            

            //row container should have 'emptymessage' attribute which styles contents when no rows to show
            expect(wrapper.find('.tableBody[emptymessage]')).toHaveLength(1)
            expect(wrapper.find('.tableRow')).toHaveLength(0)
        })

        it('should render table component with a single row & column, with default cell value', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: 'hello world'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)

            expect(wrapper.find('.tableBody[emptymessage]')).toHaveLength(0)
            expect(wrapper.find('.tableRow')).toHaveLength(1)

            //count rows created
            expect(wrapper.find('.tableBody').children()).toHaveLength(1)

            //test default label when misconfigured cell
            expect(wrapper.find('.tableBody').childAt(0).text()).toEqual('-')
        })

        it('should render table component with 2 rows, with default cell value', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: 'hello world'
                    }
                ],
                [
                    {
                        cellValue: 'hello world'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)

            //count rows created
            expect(wrapper.find('.tableRow')).toHaveLength(2)

            expect(wrapper.find('.tableBody').childAt(0).find('p').text()).toEqual('-')
            expect(wrapper.find('.tableBody').childAt(1).find('p').text()).toEqual('-')
        })
    })
    
    describe('testing for text type cells', () => {
        
         it('should render table component with a single row & column, with text cell type', () => {
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
                        cellType: 'text'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)

            //test default label when configured cell
            expect(wrapper.find('.tableBody').childAt(0).text()).toEqual('hello world')
        })       

        it('should render table component with a single row & column, with text cell type wiht optional class', () => {
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
                        cellType: 'text',
                        centered: true
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)
            const rowCell = wrapper.find('.tableRow').childAt(0)
            
            //test default label when configured cell
            expect(rowCell.hasClass('centeredCellContents')).toEqual(true)
        })

        it('should render table component with a single row & column, with text cell type wiht optional click function', () => {
            
            const mockFunc = jest.fn(() => "works")

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
                        cellType: 'text',
                        onClick: mockFunc
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)
            const rowCell = wrapper.find('.tableRow').childAt(0)
            rowCell.simulate('click')

            //test default label when configured cell
            expect(mockFunc).toHaveBeenCalled()
        })
    })

    describe('renderign table rows, with Icon cell type', () => {

        //do tests for click, opt classes? They are the same as text, just contents change. If we should, put them here! Otherwise, remove the describe block?

        it('should render table component with a single row & column, with Icon cell type', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: 'check',
                        cellType: 'icon'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)

            expect(wrapper.find('.tableRow > div[icon="check"]')).toHaveLength(1)
            expect(wrapper.find('.tableRow').text()).toEqual('<Icon />')
        })

    })

    describe('testing table row rendering link type', () => {

        it('should render table component with a single row & column, with link cell type', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: {
                            path: 'someRoute',
                            label: 'redirectMe'
                        },
                        cellType: 'link'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)
            const rowCell = wrapper.find('.tableRow').childAt(0)
            
            expect(rowCell.hasClass('urlDiv')).toEqual(true)
        })

        it('should handle wrong obj format for link', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: {
                            wrong: 'redirectMe'
                        },
                        cellType: 'link'
                    }
                ]
            ]

            //@TO DO: handle wrong prop types?! https://medium.com/shark-bytes/type-checking-with-prop-types-in-jest-e0cd0dc92d5
            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)

            //dont render Link if 
            expect(wrapper.find('.tableRow').children()).toHaveLength(0)
        })

    })
    
    describe('test row renderign with date cells', () => {

        it('should render table component with a single row & column, with date cell type', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: new Date('1990'),
                        cellType: 'date'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)
            const rowCell = wrapper.find('.tableRow').childAt(0)
            
            expect(rowCell.hasClass('dateDiv')).toEqual(true)
            expect(rowCell.children()).toHaveLength(2)
            expect(rowCell.childAt(0).childAt(0).text()).toEqual('1st Jan 1990')
        })

        it('should render table component with a single row & column, with date cell type and string date', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: '1/1/1990',
                        cellType: 'date'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)
            const rowCell = wrapper.find('.tableRow').childAt(0)
            
            expect(rowCell.hasClass('dateDiv')).toEqual(true)
            expect(rowCell.children()).toHaveLength(2)
            expect(rowCell.childAt(0).childAt(0).text()).toEqual('1st Jan 1990')
        })

        it('should render table component with a single row & column, with date cell type and timestamp date', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: 631152000000,
                        cellType: 'date'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)
            const rowCell = wrapper.find('.tableRow').childAt(0)
            
            expect(rowCell.hasClass('dateDiv')).toEqual(true)
            expect(rowCell.children()).toHaveLength(2)
            expect(rowCell.childAt(0).childAt(0).text()).toEqual('1st Jan 1990')
        })

        it('should render table component with a single row & column, with date cell type and fail due to invalid date', () => {
            const headers = [
                {
                    label: 'columnHeader'
                }
            ]

            //arr of rows
            const rows = [
                [
                    {
                        cellValue: 'asd',
                        cellType: 'date'
                    }
                ]
            ]

            const wrapper = shallow(<Table columnHeaders={headers} pageName="somePageModifier" rows={rows} />)

            //test that the rendered row's cell has no contents, since return null when date is invalid
            expect(wrapper.find('.tableBody').childAt(0).children()).toHaveLength(0)
        })
    })
})

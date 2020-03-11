import React, { createRef } from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import Checkbox from '../Checkbox'

describe('testing checkbox atom', () => {
    
    it('should render the checkbox without a checked class', () => {
        const wrapper = shallow(<Checkbox name='someName' />)
        
        expect(wrapper).toMatchSnapshot()

        expect(wrapper.hasClass('checked')).toEqual(false)
    })

    it('should render checkbox checked by default', () => {
        const wrapper = shallow(<Checkbox name='someName' checked />)

        expect(wrapper.hasClass('checked')).toEqual(true)
    })

    it('should set ref to chekbox and have its checked to true by default', () => {
        const ref = createRef()
        const wrapper = mount(<Checkbox name='someName' ref={ref} checked />)

        expect(ref.current).toBeTruthy()
        expect(ref.current.checked).toEqual(true)
    })

    it('should handle custom on change event', () => {
        const mockFn = jest.fn(() => "some logic that parent wants to perform")
        const wrapper = shallow(<Checkbox name='someName' onChange={mockFn} />)

        wrapper.simulate('click')

        expect(mockFn).toHaveBeenCalled()
    })

    it('should handle custom on change event, and prevent check if return false', () => {
        // when the onChange returns false, stop checkbox from checking itself
        const onChange = jest.fn(() => false)
        const wrapper = shallow(<Checkbox name='someName' onChange={onChange} />)

        expect(wrapper.hasClass('checked')).toEqual(false)

        act(() => {
            wrapper.prop('onClick')()
        })
        
        expect(wrapper.hasClass('checked')).toEqual(false)
    })

    it('should handle custom on change event, and allow check if return true', () => {
        // when the onChange returns true, allow checkbox to check itself
        const onChange = jest.fn(() => true)
        const wrapper = shallow(<Checkbox name='someName' onChange={onChange} />)

        expect(wrapper.hasClass('checked')).toEqual(false)

        act(() => {
            wrapper.prop('onClick')()
        })

        expect(wrapper.hasClass('checked')).toEqual(true)
    })

    it('should keep html element refs check state unchanged, when check prevented by onChange', () => {
        const ref = createRef()
        const mockOnChange = jest.fn(() => false)
        const wrapper = mount(<Checkbox name='someName' ref={ref} onChange={mockOnChange} />)
        
        // get checkbox from within forward ref
        const checkbox = wrapper.childAt(0)

        expect(ref.current.checked).toEqual(false)
        
        act(() => {
            checkbox.prop('onClick')() 
        })
        
        expect(mockOnChange).toHaveBeenCalled()

        expect(ref.current.checked).toEqual(false)
    })

    it('should update html element refs check state, when check succeeds', () => {
        const ref = createRef()
        const mockOnChange = jest.fn(() => true)
        const wrapper = mount(<Checkbox name='someName' ref={ref} onChange={mockOnChange} />)
      
        // get checkbox from within forward ref
        const checkbox = wrapper.childAt(0)

        expect(ref.current.checked).toEqual(false)
        
        act(() => {
            checkbox.prop('onClick')() 
        })
        
        expect(mockOnChange).toHaveBeenCalled()

        expect(ref.current.checked).toEqual(true)
    })

    it('should toggle checked state based on clicks', () => {
        const wrapper = shallow(<Checkbox name='someName' />)

        expect(wrapper.hasClass('checked')).toEqual(false)

        wrapper.simulate('click')

        expect(wrapper.hasClass('checked')).toEqual(true)

        wrapper.simulate('click')

        expect(wrapper.hasClass('checked')).toEqual(false)
    })

    it('should toggle checked state based on clicks, with onChange preventing', () => {

        const mockOnChange = jest.fn(() => false)
        const wrapper = shallow(<Checkbox name='someName' onChange={mockOnChange} />)

        expect(wrapper.hasClass('checked')).toEqual(false)

        wrapper.simulate('click')

        expect(wrapper.hasClass('checked')).toEqual(false)

        wrapper.simulate('click')

        expect(wrapper.hasClass('checked')).toEqual(false)
    })

    it('should toggle checked state based on clicks, with onChange allowing', () => {

        const mockOnChange = jest.fn(() => true)
        const wrapper = shallow(<Checkbox name='someName' onChange={mockOnChange} />)

        expect(wrapper.hasClass('checked')).toEqual(false)

        wrapper.simulate('click')

        expect(wrapper.hasClass('checked')).toEqual(true)

        wrapper.simulate('click')

        expect(wrapper.hasClass('checked')).toEqual(false)
    })

    it('should give ref to html checkbox-type input element', () => {
        const inputRef = createRef()
        const wrapper = mount(<Checkbox name='someName' ref={inputRef} />)
        
        // test that current is not undefined, meaning it points to html elem: <input type='checkbox' />
        expect(inputRef.current).toBeTruthy()

        /// test that ref to html element allows us to get checked state
        expect(inputRef.current.checked).toEqual(false)

        wrapper.simulate('click')
        
        expect(inputRef.current.checked).toEqual(true)
    })

    it('should prevent checkbox from updating if parent says so through passed onChange func', () => {
        const inputRef = createRef()

        const wrapper = mount(<Checkbox name='someName' ref={inputRef} />)
        
        wrapper.simulate('click')

        expect(wrapper.hasClass('checked')).toEqual(false)

        expect(inputRef.current.checked).toEqual(true)
    })
})
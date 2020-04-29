import React from 'react'
import PropTypes from 'prop-types'
import Pagination from './Pagination'
import createPaginationLogic from './createPaginationLogic'

const DefaultPagination = ({
  endPageNumber,
  currentPageNumber = 1,
  numbersVisibleLeft = 2,
  numbersVisibleRight = 2,

  ...paginationProps
}) => {
  let pageRange = createPaginationLogic(
    currentPageNumber,
    endPageNumber,
    numbersVisibleLeft,
    numbersVisibleRight
  )
  return (
    <Pagination pageRange={pageRange} currentPageNumber={currentPageNumber} {...paginationProps} />
  )
}

DefaultPagination.propTypes = {
  currentPageNumber: PropTypes.number,
  endPageNumber: PropTypes.number,
  numbersVisibleLeft: PropTypes.number,
  numbersVisibleRight: PropTypes.number,
}

export default DefaultPagination

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import components
import Icon from 'UI/Icon/Icon'

import styles from './styles.module.scss'

// import helpers
import { dateDisplay } from '~/helper/date'

const Row = ({ rowCells, pageName, uniqueRowId, withActions = true }) => {
  const classes = [styles.tableRow, withActions ? styles.withActions : '', styles[pageName] || '']
    .join(' ')
    .trim()

  return (
    <div className={classes}>
      {rowCells.map(({ cellValue, cellType, centered = false, onClick = null }, index) => {
        const key = `${uniqueRowId}-${index}`
        const centeredCellContents = centered ? styles.centeredCellContents : undefined
        const onClickFunc = onClick ? () => onClick({ cellValue, rowIndex: index }) : undefined

        switch (cellType) {
          case 'text':
            return (
              <div
                key={key}
                className={centeredCellContents}
                onClick={onClickFunc}
                role={onClickFunc ? 'button' : undefined}
              >
                <p>{cellValue}</p>
              </div>
            )
          case 'icon':
            return (
              <div
                icon={cellValue}
                key={key}
                onClick={onClickFunc}
                role={onClickFunc ? 'button' : undefined}
              >
                <Icon icon={cellValue} className={centeredCellContents} />
              </div>
            )
          case 'link':
            if (
              typeof cellValue === 'object' &&
              cellValue.hasOwnProperty('path') &&
              cellValue.hasOwnProperty('label')
            ) {
              return (
                <div key={key} className={styles.urlDiv} onClick={onClickFunc}>
                  <Link className={centeredCellContents} to={cellValue.path}>
                    {cellValue.label}
                  </Link>
                </div>
              )
            }

            // or return a UI friendly msg?
            return null
          case 'date': {
            const parseDateStringOrDate = new Date(cellValue)

            // check if invalid date obj
            if (Number.isNaN(parseDateStringOrDate.getTime())) {
              // or return a UI friendly msg?
              return null
            }

            return (
              <div
                role={onClickFunc ? 'button' : undefined}
                key={key}
                className={[styles.dateDiv, centeredCellContents].join(' ').trim()}
                onClick={onClickFunc}
              >
                <p>
                  <b>{dateDisplay(parseDateStringOrDate).withShortMonths().format()}</b>
                </p>
                <p>{parseDateStringOrDate.toLocaleTimeString()}</p>
              </div>
            )
          }
          default:
            return (
              <div
                key={key}
                className={centeredCellContents}
                onClick={onClickFunc}
                role={onClickFunc ? 'button' : undefined}
              >
                <p>-</p>
              </div>
            )
        }
      })}
    </div>
  )
}

Row.propTypes = {
  rowCells: PropTypes.arrayOf(
    PropTypes.shape({
      cellValue: PropTypes.oneOfType([
        //label/text
        PropTypes.string,
        //timestamp
        PropTypes.number,
        //link obj
        PropTypes.shape({
          path: PropTypes.string,
          label: PropTypes.string,
        }),
        //other proptypes based on added cell types for row generation
      ]).isRequired,
      cellType: PropTypes.oneOf(['text', 'icon', 'link', 'date', 'img']),
      centered: PropTypes.bool,
      onClick: PropTypes.func,
    })
  ).isRequired,
  pageName: PropTypes.string.isRequired,
  uniqueRowId: PropTypes.string,
  withActions: PropTypes.bool,
}

export default Row

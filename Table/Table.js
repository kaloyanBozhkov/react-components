import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header/Header'
import Row from './Row/Row'

import styles from './styles.module.scss'

/**
 * @param  {} rows -> aar of obj: {  cellValue, cellType, centered?, onClick? }
 * @param  {} headerCells -> arr of obj: { label, centered? , withIcon?, onClick? }
 * @param  {} noActions -> bool, do the table rows have any Active/Edit/Delete cells to click?
 * @param  {} pageName -> string, unique string used in Table component's styles module scss to tell it the page specific grid-columns-template
 */
const Table = ({ pageName, headerCells = [], rows = [], withActions = true }) => {
  // show a user friendly msg if provided headerCells are missing, or throw Error?
  if (!headerCells.length) {
    return <p>Could not display table, please try again later</p>
  }

  return (
    <div aria-label="table" role="table" className={styles.table}>
      <Header headerCells={headerCells} pageName={pageName} />
      <section
        aria-label="table body"
        className={styles.tableBody}
        emptymessage={rows.length === 0 ? 'No data to show yet, try again later!' : undefined}
      >
        {/* uniqueRowId is property set to row, an array. row is just stubs data it will be proper after actual api is received */}
        {rows.length > 0 &&
          rows.map((row) => (
            <Row
              key={row.uniqueRowId}
              uniqueRowId={row.uniqueRowId}
              rowCells={row}
              withActions={withActions}
              pageName={pageName}
            />
          ))}
      </section>
    </div>
  )
}

Table.propTypes = {
  rows: PropTypes.array,
  headerCells: PropTypes.array.isRequired,
  noActions: PropTypes.bool,
  pageName: PropTypes.string.isRequired,
}

export default Table

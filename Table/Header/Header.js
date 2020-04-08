import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'UI/Icon/Icon'
import styles from './styles.module.scss'

const Header = ({ pageName, headerCells }) => {

  const classes = [
    styles.tableHeader, 
    styles[pageName] || ''
  ].join(' ').trim()

  return (<header aria-label="table header" className={classes}>
    {headerCells.map(
      ({ label, centered = false, withIcon = false, onClick = undefined }, index) => {
        // apply specific styling based on needs for that table
        const classes = [
          centered ? styles.centered : '',
          withIcon ? styles.withIcon : '',
          onClick ? styles.withAction : ''
        ].join(' ').trim() || undefined

        return (
          <div key={`${label.replace(' ', '')}-${index}`} className={classes} onClick={onClick}>
            <p>{label}</p>
            {withIcon && <Icon icon={withIcon} />}
          </div>
        )
      }
    )}
  </header>)
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  headerCells: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      centered: PropTypes.bool,
      withIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ])
    })
  )
}

export default Header

import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

import Icon from 'UI/Icon/Icon'

const Loading = ({ loadingMsg = '', isAbsolutelyPositioned = false }) => {
  const classes = [styles.loading, isAbsolutelyPositioned ? styles.absolutelyPositioned : '']
    .join(' ')
    .trim()

  return (
    <div className={classes}>
      <Icon icon="cog" />
      {loadingMsg && <p>{loadingMsg}</p>}
    </div>
  )
}

Loading.propTypes = {
  loadingMsg: PropTypes.string,
}

export default Loading

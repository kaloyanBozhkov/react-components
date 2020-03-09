import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

//import Pagination from '~components/Pagination/Pagination'

import Icon from 'UI/Icon/Icon'

//import helpers
import dateDisplay from '~/utilities/dateDisplay/dateDisplay'

//create table header from name of properties of rows returned from API
const createHeader = (columnHeaders = []) => (
    <header className={styles.tableHeader}>
        {columnHeaders.map(({ label, centered = false, withIcon = false, onClick = undefined }, index) => {

            //apply specific styling based on needs for that table
            const classes = [
                centered ? styles.centered : '',
                withIcon ? styles.withIcon : '',
                onClick ? styles.withAction : ''
            ].join(' ').trim() || undefined

            return (
                <div key={index} className={classes} onClick={onClick}>
                    <p>{label}</p>{withIcon && <Icon icon={withIcon} />}
                </div>
            )
        })}
    </header>
)

//create table body rows
    const createRows = (rows = []) => (
        <section className={styles.tableBody} emptymessage={rows.length === 0? "No data to show yet, try again later!" : undefined} >
            {rows.map((row, index) => <div key={index} className={styles.tableRow}>{
                Object.values(row).map(({ cellValue, cellType, centered = false, onClick = null }, index) => {
                   
                    const centeredCellContents = centered ? styles.centeredCellContents : undefined
                    const onClickFunc = onClick ? (() => onClick({ cellValue, rowIndex: index })) : undefined
                   
                    switch (cellType) {
                        case 'text':
                            return (
                                <div key={index} className={centeredCellContents} onClick={onClickFunc} >
                                    <p>{cellValue}</p>
                                </div>
                            )
                        case 'icon':
                            return (
                                <div icon={cellValue} key={index} onClick={onClickFunc} >
                                    <Icon icon={cellValue} className={centeredCellContents} />
                                </div>
                            )
                        case 'link':
                            if (typeof cellValue === 'object' && cellValue.hasOwnProperty('path') && cellValue.hasOwnProperty('label')) {
                                return (
                                    <div key={index} className={styles.urlDiv} onClick={onClickFunc}>
                                        <Link className={centeredCellContents} to={cellValue.path}>{cellValue.label}</Link>
                                    </div>
                                )
                            }

                            //or return a UI friendly msg?
                            return null                    
                        case 'date':
                            const parseDateStringOrDate = new Date(cellValue)

                            //check if invalid date obj
                            if (isNaN(parseDateStringOrDate.getTime())) {

                                //or return a UI friendly msg?
                                return null
                            }

                            return (
                                <div key={index} className={styles.dateDiv + ' ' + centeredCellContents} onClick={onClickFunc}>
                                    <p><b>{dateDisplay(parseDateStringOrDate)}</b></p>
                                    <p>{parseDateStringOrDate.toLocaleTimeString()}</p>
                                </div>
                            )
                        // case 'textTwoParts': //same formatting as date, just sets normal text
                        //     return (
                        //         <div key={index} className={styles.dateDiv + ' ' + centeredCellContents} onClick={onClickFunc}>
                        //             <p><b>{cellValue.first}</b></p>
                        //             <p>{cellValue.second}</p>
                        //         </div>
                        //     )
                        // case 'lotteryNumbers'://not yet implemented/tested since no img?
                        //     return (
                        //         <div key={index} className={centeredCellContents} onClick={onClickFunc} >
                        //             {/* <LotteryNumbers label={cellValue.label} state={cellValue.state} numbersArr={cellValue.numbers} /> */}
                        //         </div>
                        //     )
                        // case 'img'://not yet implemented/tested since no img?
                        //     return (
                        //         <img src={cellValue} alt={cellValue} onClick={onClickFunc} />
                        //     )
                        default:
                            return (
                                <div key={index} className={centeredCellContents} onClick={onClickFunc} >
                                    <p>-</p>
                                </div>
                            )
                    }

                })}</div>)}
        </section>
    )

/**
 * @param  {} rows -> aar of obj: {  cellValue, cellType, centered?, onClick? }
 * @param  {} columnHeaders -> arr of obj: { label, centered? , withIcon?, onClick? }
 * @param  {} noActions -> bool, do the table rows have any Active/Edit/Delete cells to click?
 * @param  {} pageName -> string, unique string used in Table component's styles module scss to tell it the page specific grid-columns-template 
 */
const Table = ({ pageName, columnHeaders = [], rows = [], noActions = false }) => {

    //show a user friendly msg if provided columnHeaders are missing, or throw Error?
    if (!columnHeaders.length) {
        return <p>Could not display table, please try again later</p>
    }

    const classes = [
        styles.table,
        noActions ? styles.noActions : '',
        styles[pageName] || ''
    ].join(' ').trim()

    return (
        <div className={classes}>
            {createHeader(columnHeaders)}
            {createRows(rows)}
        </div>
    )
}

Table.propTypes = {
     rows: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                cellValue: PropTypes.oneOfType([
                    //label/text
                    PropTypes.string,
                    //timestamp
                    PropTypes.number, 
                    //link obj
                    PropTypes.shape({
                        path: PropTypes.string,
                        label: PropTypes.string
                    }),
                    //other proptypes based on added cell types for row generation
                ]).isRequired, 
                cellType: PropTypes.oneOf(['text', 'icon', 'link', 'date', 'img']), 
                centered: PropTypes.bool, 
                onClick: PropTypes.func
            })
        )
     ), 
     columnHeaders: PropTypes.oneOfType([
         PropTypes.arrayOf([
            PropTypes.shape({
                label: PropTypes.string.isRequired, 
                centered: PropTypes.bool, 
                withIcon: PropTypes.string
            })
        ]),
        PropTypes.array
     ]).isRequired, 
     noActions: PropTypes.bool,
     pageName: PropTypes.string.isRequired
}

export default Table

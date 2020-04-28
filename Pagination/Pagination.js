import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

//import styles
import styles from './pagination.module.scss'

//used to create arrays with this dope structure [start, start+1, ..., finish]
const arrFromXToY = (start, finish) => [...new Array(finish)].map((k, index) => start + index)

const createPaginationLogic = (currentPageNumber, endPageNumber, numbersVisibleLeft, numbersVisibleRight) => {

    if (endPageNumber - numbersVisibleLeft - numbersVisibleRight - 1 < 2) {
       
        //number of pages is less or equal to 6 (numbersVisibleTotal[which is numbersVisibleLeft - numbersVisibleRight - 1] + 1), no need to consider dots
        return arrFromXToY(1, endPageNumber)
    } 
        
        //consider currentPageNumber to deduce where the dots are and structure the page numbers array properly
        let pageRange = []
        let addToFinish = 0
        let removeFromStart = 0
        let startRange = currentPageNumber - numbersVisibleLeft
        let finishRange = currentPageNumber + numbersVisibleRight

        //check if dots at start
        if (startRange > 1) {
            if (startRange === 2) {
               
                //make sure number after first number is not supposed to be dots, if it is print +1 that number so dots can fit
                startRange += 1
            }

            //add potential starting dots & initial number
            pageRange = [
                1,
                '...'
            ]
        }else if (startRange < 1) {
            
            //if start number is less than 1 make it 1 and make sure print goes on for additional space saved
            addToFinish = 1 - startRange
            startRange = 1
        }

        //if finish range passes last number then cap to last number and add the excess space to allow printing from start sooner
        if (finishRange >= endPageNumber) {
            removeFromStart =  finishRange - endPageNumber
            finishRange = endPageNumber
        }

        //apply additional spacings
        startRange -= removeFromStart
        finishRange += addToFinish

        
        if (finishRange + 1 === endPageNumber) {
            //make sure number before last number is not supposed to be dots, if it is print to -1 that number so dots can fit

            finishRange -= 1 
        }

        //add range of numbers to print
        pageRange = [
            ...pageRange,
            ...arrFromXToY(startRange, finishRange)
        ]

        //add potential trailer dots & final number
        if (finishRange < endPageNumber) {
            pageRange = [
                ...pageRange,
                '...',
                endPageNumber
            ]
        }
        return pageRange
}

const Pagination = ({ endPageNumber, currentPageNumber = 1, numbersVisibleLeft = 2, numbersVisibleRight = 2, worksWithStateInsteadOfRoutes=false, onClickUpdatePageState=f=>f}) => {
    
    let pageRange = createPaginationLogic(currentPageNumber, endPageNumber, numbersVisibleLeft, numbersVisibleRight)

    return (
        <div className={styles.pagination}>
            {pageRange.map((num, key) => {
                return num !== '...' ? 
                    (
                        worksWithStateInsteadOfRoutes ? (<button key={key} className={num === currentPageNumber ? styles.pagination_activeButton : ''} onClick={() => onClickUpdatePageState(num)} disabled={num === currentPageNumber}>{num}</button>)
                        : (<NavLink key={key} activeClassName={styles.pagination_activeButton} to={num+''}>{num}</NavLink>)
                    
                    ) 
                    : (<span key={key}>{num}</span>)
            })}
        </div>
    )
}

Pagination.propTypes = {
    classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
            PropTypes.string
        )
    ]),
    currentPageNumber: PropTypes.number,
    endPageNumber: PropTypes.number,
    numbersVisible: PropTypes.number,
    worksWithStateInsteadOfRoutes: PropTypes.bool,
    onClickUpdatePageState: PropTypes.func,
}

export default Pagination

import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// import styles
import styles from "./pagination.module.scss";

export const Pagination = ({
  worksWithStateInsteadOfRoutes,
  currentPageNumber,
  onClickUpdatePageState,
  pageRange,
}) => {
  return (
    <div className={styles.pagination}>
      {pageRange.map((num, key) => {
        return num !== "..." ? (
          worksWithStateInsteadOfRoutes ? (
            <button
              key={key}
              className={
                num === currentPageNumber ? styles.pagination_activeButton : ""
              }
              onClick={() => onClickUpdatePageState(num)}
              disabled={num === currentPageNumber}
            >
              {num}
            </button>
          ) : (
            <NavLink
              key={key}
              activeClassName={styles.pagination_activeButton}
              to={num + ""}
            >
              {num}
            </NavLink>
          )
        ) : (
          <span key={key}>{num}</span>
        );
      })}
    </div>
  );
};

Pagination.propTypes = {
  classNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  worksWithStateInsteadOfRoutes: PropTypes.bool,
  onClickUpdatePageState: PropTypes.func,
};

export default Pagination;

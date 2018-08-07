import React, {Component} from 'react'
import {Pagination} from 'semantic-ui-react'
import PropTypes from "prop-types";
import {isStringEmpty} from "../static/ObjectsUtils";

/**
 * Pagination Component for tables
 *
 * @Author: Rocky Chen
 */
export default class TablePagination extends Component {

    static propTypes = {
        totalPages: PropTypes.number.isRequired,
        getActivePages: PropTypes.func.isRequired,
        boundaryRange: PropTypes.number,
        showEllipsis: PropTypes.bool,
        showFirstAndLastNav: PropTypes.bool,
        showPreviousAndNextNav: PropTypes.bool,
        displaySize: PropTypes.string,//mini,tiny,small,medium,large,big,huge,massive
        currentPage:PropTypes.number,
    }

    constructor(props) {
        super(props);

        this.state = {
            totalPages: props.totalPages,
            activePage: props.currentPage, // always show page one by default
            boundaryRange: props.boundaryRange === undefined ? 1 : props.boundaryRange,
            showEllipsis: props.showEllipsis === undefined ? true : props.showEllipsis,
            showFirstAndLastNav: props.showFirstAndLastNav === undefined ? true : props.showFirstAndLastNav,
            showPreviousAndNextNav: props.showPreviousAndNextNav === undefined ? true : props.showPreviousAndNextNav,
            displaySize: isStringEmpty(props.displaySize) ? "small" : props.displaySize,
        }
    }


    handlePaginationChange = (e, {activePage}) => {
        //console.log(activePage)
        this.setState(
            {activePage: activePage}
        );
        this.props.getActivePages(activePage);
    }

    render() {
        const {
            activePage,
            displaySize,
        } = this.state;

        const {totalPages,boundaryRange,showEllipsis,showFirstAndLastNav,showPreviousAndNextNav} = this.props;

        //console.log(activePage)
        // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
        return (

            <Pagination
                className={"right floated"}
                activePage={activePage}
                boundaryRange={boundaryRange}
                onPageChange={this.handlePaginationChange}
                size={displaySize}
                totalPages={totalPages}
                ellipsisItem={showEllipsis}
                firstItem={showFirstAndLastNav}
                lastItem={showFirstAndLastNav}
                prevItem={showPreviousAndNextNav}
                nextItem={showPreviousAndNextNav}
            />
        )
    }
}
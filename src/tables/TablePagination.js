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
    }

    constructor(props) {
        super(props);

        this.state = {
            totalPages: props.totalPages,
            activePage: 1, // always show page one by default
            boundaryRange: props.boundaryRange === undefined ? 1 : props.boundaryRange,
            showEllipsis: props.showEllipsis === undefined ? true : props.showEllipsis,
            showFirstAndLastNav: props.showFirstAndLastNav === undefined ? true : props.showFirstAndLastNav,
            showPreviousAndNextNav: props.showPreviousAndNextNav === undefined ? true : props.showPreviousAndNextNav,
            displaySize: isStringEmpty(props.displaySize) ? "small" : props.displaySize,
        }
    }


    handlePaginationChange = (e, {activePage}) => {
        this.setState(
            {activePage: activePage}
        );
        this.props.getActivePages(activePage);
    }

    render() {
        const {
            activePage,
            boundaryRange,
            showEllipsis,
            showFirstAndLastNav,
            showPreviousAndNextNav,
            totalPages,
            displaySize,
        } = this.state

        return (

            <Pagination
                className={"right floated"}
                activePage={activePage}
                boundaryRange={boundaryRange}
                onPageChange={this.handlePaginationChange}
                size={displaySize}
                totalPages={totalPages}
                // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                ellipsisItem={showEllipsis ? undefined : null}
                firstItem={showFirstAndLastNav ? undefined : null}
                lastItem={showFirstAndLastNav ? undefined : null}
                prevItem={showPreviousAndNextNav ? undefined : null}
                nextItem={showPreviousAndNextNav ? undefined : null}
            />
        )
    }
}
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
        currentPage: PropTypes.number,
        paginationProps: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            totalPages: props.totalPages,
            activePage: props.currentPage, // always show page one by default
        }
    }

    static defaultProps = {
        paginationProps: {
            size: 'small',//mini,tiny,small,medium,large,big,huge,massive
        },
    };


    handlePaginationChange = (e, {activePage}) => {
        //console.log(activePage)
        this.setState(
            {activePage: activePage}
        );
        this.props.getActivePages(activePage);
    };

    render() {
        const {
            activePage,
        } = this.state;

        const {paginationProps, totalPages} = this.props;

        const {boundaryRange, ellipsisItem, size, firstItem, lastItem, nextItem, pageItem, prevItem, siblingRange} = paginationProps;

        //console.log(activePage)
        return (

            <Pagination
                className={"right floated"}
                activePage={activePage}
                onPageChange={this.handlePaginationChange}
                totalPages={totalPages}
                boundaryRange={boundaryRange}
                size={size}
                ellipsisItem={ellipsisItem}
                firstItem={firstItem}
                lastItem={lastItem}
                nextItem={nextItem}
                pageItem={pageItem}
                prevItem={prevItem}
                siblingRange={siblingRange}
            />
        )
    }
}
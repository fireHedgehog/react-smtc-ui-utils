import React, {Component} from 'react';
import {Dropdown, Label, Table} from 'semantic-ui-react'
import PropTypes from "prop-types";
import TablePagination from "./TablePagination";
import {getRandomNumber} from "../static/ObjectsUtils";


//{key: 't', text: '1', value: '1'},
const pageOptions = [
    {key: 's', text: '10', value: 10},
    {key: 'm', text: '20', value: 20},
    {key: 'l', text: '50', value: 50},
]

/**
 * pagination footer example:
 * using data count and page size to calculate the pagination bar
 *
 * @type {{ colCount: *, pageSize: *, handlePageClick: *, dataCount: *}}
 */
export class PaginationFooter extends Component {


    static propTypes = {
        colCount: PropTypes.number.isRequired,
        pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        handlePageClick: PropTypes.func.isRequired,
        dataCount: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        onPageSizeChange: PropTypes.func.isRequired,
        footerMap: PropTypes.array,
        paginationProps: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            footerKey: getRandomNumber(),
        }
    }

    handlePageClick(val) {
        this.props.handlePageClick(val);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentPage !== prevProps.currentPage) {
            this.setState({
                footerKey: getRandomNumber(),
            });
        }
    }

    handlePageSizeChange = (e, {value}) => {

        //Auto set page to page 1
        this.props.handlePageClick(1);

        this.setState({
            pageSize: value,
            footerKey: getRandomNumber(),
        });

        this.props.onPageSizeChange(value);
    };

    render() {

        //currently only show the first Item of "footerMap" by default
        const {colCount, pageSize, dataCount, currentPage, footerMap, paginationProps} = this.props;

        const {footerKey} = this.state;

        return (
            <Table.Row>
                <Table.HeaderCell colSpan={1}>
                    <div>
                        <Label color='purple' ribbon>Page Size:</Label>
                        <Dropdown upward floating inline
                                  options={pageOptions}
                                  defaultValue={pageSize}
                                  name={"pageSize"}
                                  onChange={this.handlePageSizeChange}
                        />
                    </div>
                </Table.HeaderCell>

                <Table.HeaderCell key={footerKey} colSpan={colCount - 1 <= 0 ? 1 : colCount - 1}>

                    {
                        footerMap.map((elm, j) => {

                            return (elm)
                        })
                    }

                    <TablePagination
                        currentPage={currentPage}
                        totalPages={Math.ceil((dataCount === undefined ? 1 : dataCount) / pageSize)}
                        getActivePages={(val) => this.handlePageClick(val)}
                        paginationProps={paginationProps}
                    />
                </Table.HeaderCell>
            </Table.Row>


        )
    }
}


// Secondary do not have page size selection label
export class PaginationFooterSecondary extends Component {


    static propTypes = {
        colCount: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        handlePageClick: PropTypes.func.isRequired,
        dataCount: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        footerMap: PropTypes.array,
        paginationProps: PropTypes.object,
    };

    state = {
        footerKey: getRandomNumber(),
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentPage !== prevProps.currentPage) {
            this.setState({
                footerKey: getRandomNumber(),
            });
        }
    }

    handlePageClick(val) {
        this.props.handlePageClick(val);
    }

    render() {

        //currently only show the first Item of "footerMap" by default
        const {colCount, pageSize, dataCount, currentPage, footerMap, paginationProps} = this.props;

        const {footerKey} = this.state;


        return (
            <Table.Row>

                <Table.HeaderCell key={footerKey} colSpan={colCount}>
                    {
                        footerMap.map((elm, j) => {

                            return (elm)
                        })
                    }
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={Math.ceil((dataCount === undefined ? 1 : dataCount) / pageSize)}
                        getActivePages={(val) => this.handlePageClick(val)}
                        paginationProps={paginationProps}
                    />

                </Table.HeaderCell>

            </Table.Row>


        )
    }
}

//CustomizedFooter
export class CustomizedFooter extends Component {


    static propTypes = {}

    static defaultProps = {
        tableElementType: "CustomizedFooter",
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div/>
        )
    }
}


export class NoPaginationUserFooter extends Component {


    static propTypes = {
        colCount: PropTypes.number.isRequired,
        footerMap: PropTypes.array,
    }


    state = {}

    render() {

        const {colCount, footerMap} = this.props;

        return (
            <Table.Row>

                <Table.HeaderCell colSpan={colCount}>
                    {
                        footerMap.map((elm, j) => {

                            return (elm)
                        })
                    }

                </Table.HeaderCell>

            </Table.Row>
        )
    }
}
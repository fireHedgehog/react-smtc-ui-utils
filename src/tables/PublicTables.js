import React from 'react'
import {Table, Checkbox} from 'semantic-ui-react'
import PropTypes from "prop-types";
import {PaginationFooter, PaginationFooterSecondary} from "./PublicTableFooters";
import {isArrayEmpty, getRandomNumber, isStringEmpty} from "../static/ObjectsUtils";
import _ from 'lodash';
//import update from "immutability-helper";

/*
example for creating a table with just 2 columns:

 <PublicTables data={data} ----> need a data array[Json] for example[{user_id:1,user_name:rocky}]
    showAllCheck={true}  ----> whether show check all button
    checkedCallBackFunction={(val)=>console.log(val)}  ----> get checked item onChane call back
 >

       <PublicTableHeaders
            header={"Survey ID"} ----> the table header
            accessor={"user_id"} ----> the accessor/key of the data
            colAsCheckBox={true} // using accessor "sv_id" as a checked box
       />

       <PublicTableHeaders
            header={"Actions"} ----> the table header
            accessor={"user_id"} ----> the accessor/key of the data
            columnFormat={(cellValue, rowObject) => this.addActionBtns(cellValue, rowObject)} ----> column data formatter
            collapsing={true} ----> compact column or not
            customizeText={(cellValue, rowObject) => this.customizeHeader(cellValue, rowObject)} ----> table header formatter
            columnAlign={'center'} ---->  data context cell text align
            textAlign={'center'}  ---->  table header  cell text align
       />

 </PublicTables>

 */

/**
 *
 * @author:RockyChen
 *
 * @abstract:
 *  Universal table element
 *
 * @style:
 *  1.size : mini,tiny,small,medium,large,big,huge,massive
 *  2.selectable : default--false : can not be selected,vise versa
 *  3.unstackable: PropTypes.bool,
 *  4.celled: PropTypes.bool,
 *  5.basic: PropTypes.string,//very
 *  6.collapsing:
 *  7.compact :  a table may sometimes need to be more compact to make more rows visible at a time.
 *  8.definition :A table may be formatted to emphasize a first column that defines a rows content.
 *  9.inverted: A table's colors can be inverted.
 *  10.fixed.bool: A table may sometimes need to be more padded for legibility.
 *  11.singleLine: A table can specify that its cell contents should remain on a single line and not wrap.
 *  12.sortable : A table may allow a user to sort contents by clicking on a table header.
 *  13.stackable: A table can specify how it stacks table content responsively.
 *
 *
 *
 * @checkOptions:
 *  1.checkOptions.showAllCheck=true // show "check all" button on the header, default = false;
 *  2.checkOptions.checkOnSelect=true // unimplemented --- wait for spare time
 *  3.checkOptions.checkedCallBackFunction = ()=>void(0)
 *
 * @pagination : boolean, if true, just show the pagination bar and re-calculate the data set
 *
 * @onRowClickFunc : call back function of click a row, give back the data of clicking row.
 */
export default class PublicTables extends React.Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        tableStyle: PropTypes.array,
        showAllCheck: PropTypes.bool,
        checkedCallBackFunction: PropTypes.func,
        onRowSelectCallBack: PropTypes.func,
        pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["primary", "secondary"])]).isRequired,
        selectable: PropTypes.bool,
        color: PropTypes.string,
        onRowClickFunc: PropTypes.func,
        unstackable: PropTypes.bool,
        celled: PropTypes.bool,
        basic: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),//"very"
        collapsing: PropTypes.bool,
        compact: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),//"very"
        definition: PropTypes.bool,
        inverted: PropTypes.bool,
        fixed: PropTypes.bool,
        padded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        singleLine: PropTypes.bool,
        sortable: PropTypes.bool,
        stackable: PropTypes.bool,
        verticalAlign: PropTypes.oneOf(['bottom', 'middle', 'top'])
        /**
         *

         structured
         {bool}
         A table can be formatted to display complex structured data.

         tableData
         {custom}
         Data to be passed to the renderBodyRow function.

         */
    }

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            tableStyle: isArrayEmpty(props.tableStyle) ? [] : props.tableStyle,
            showAllCheck: props.showAllCheck === undefined ? false : props.showAllCheck,
            pagination: props.pagination === undefined ? false : props.pagination,
            pageSize: 20,
            allChecked: false,
            checkedIds: [],
            currentPage: 1,
            column: null,
            direction: null,
        };
    }

    handlePageSizeChange = (value) => {
        this.setState({
                pageSize: parseInt(value, 20),
            }
        );
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.data,
            key: getRandomNumber(1000000),
        });
    }

    //filter the column by given params
    filterDataByFilterContext(columnAccessor, filterContext, dataSet) {
        //console.log(columnAccessor, filterContext, dataSet)
        try {
            dataSet = dataSet.filter(function (ele) {
                //always using toSting() to simplify the compare
                const origin = "string" === ele[columnAccessor] ? ele[columnAccessor] : ele[columnAccessor].toString();
                const filter = "string" === filterContext ? filterContext : filterContext.toString();
                //console.log(origin,filter)
                return origin.includes(filter);
            });

        } catch (e) {
            // if filter has some exceptions, just do nothing
        }

        return dataSet;
    }

    //modify the checked list
    modifyCheckedArray(id) {
        //console.log(id)
        const {checkedIds} = this.state;
        const index = checkedIds.indexOf(id);
        if (index < 0) {
            checkedIds.push(id);
        } else {
            checkedIds.splice(index, 1);
        }
        this.setState({
            checkedIds: checkedIds,
        });
        //if call back function is not undefined , call it
        if (this.props.checkedCallBackFunction) {
            this.props.checkedCallBackFunction(checkedIds);
        }
    }

    /*
     *   currentPage*pageSize  is the beginning of a page
     *   (currentPage+1)*pageSize  is the end of a page
     *
     *   currentPage provided by semantic is beginning from 1
     *   but array index of javascript is beginning from 0
     *   that is why I use (currentPage-1)
     */
    TablePagination(ParamArr) {
        const {currentPage, pageSize} = this.state;
        const returnArr = ParamArr.slice((currentPage - 1) * pageSize, (currentPage) * pageSize);
        return returnArr;
    }


    // onPageChange
    handlePageClick = (data) => {
        //console.log(data);
        this.setState({
            currentPage: data
        });
    };

    /* check all button click
       using given accessor
    */
    toggleCheckAll = (accessor) => {
        const {allChecked, data, checkedIds} = this.state;
        //console.log(accessor)
        this.setState({allChecked: !allChecked});

        let currentPageList = this.TablePagination(data);

        if (!allChecked === true) {
            for (let i = 0; i < currentPageList.length; i++) {
                checkedIds.push(currentPageList[i][accessor]);
            }
            this.setState({checkedIds: checkedIds});
            //if call back function is not undefined , call it
            if (this.props.checkedCallBackFunction) {
                this.props.checkedCallBackFunction(checkedIds);
            }
        } else {
            this.setState({checkedIds: []});
            //if call back function is not undefined , call it
            if (this.props.checkedCallBackFunction) {
                this.props.checkedCallBackFunction([]);
            }

        }

    }

    //onRowSelectAndClick
    onRowSelectCallBack(column) {
        if (this.props.onRowSelectCallBack) {
            this.props.onRowSelectCallBack(column);
        }
    }

    handleSort = (clickedColumn,sortable) => () => {

        if(sortable){
            const { column, data, direction } = this.state

            if (column !== clickedColumn) {
                this.setState({
                    column: clickedColumn,
                    data: _.sortBy(data, [clickedColumn]),
                    direction: 'ascending',
                })

                return
            }

            this.setState({
                data: data.reverse(),
                direction: direction === 'ascending' ? 'descending' : 'ascending',
            })
        }
    }

    render() {
        const {
            data,
            pageSize,
            key,
            allChecked,
            showAllCheck,
            pagination,
            currentPage,
            direction,
        } = this.state;

        let colCount = 0; // calculate the total columns
        const headerMap = [];//headerMap, check props
        const footerMap = [];

        let dataSet = Object.assign([], data);//always assign to a new Array to avoid pointer issue.

        React.Children.forEach(this.props.children, (column, i) => {
            // type should be PublicTableHeaders
            if (column.type.name === "PublicTableHeaders") {
                //console.log(i,"textAlign:",column.props.textAlign);
                const filterContext = column.props.filterContext === undefined ? "" : column.props.filterContext;
                const accessor = column.props.accessor === undefined ? "" : column.props.accessor;

                /*
                * TODO: customization filter function needed:
                * give a dataSet as arg[], give a dataSet Back, that means can write
                * customized filters such as :
                * 1 using 'greater than' or 'less than',
                * 2 filterText === colVal || something || something
                */

                //filter dataSet by accessor and filterContext
                if (filterContext !== undefined && filterContext !== null && filterContext !== '') {
                    //console.log(filterContext)
                    dataSet = this.filterDataByFilterContext(accessor, filterContext, dataSet)
                }

                //only push not hidden element
                if (column.props.isHidden !== true) {
                    headerMap.push(column) // push unhidden columns in array for looping
                    colCount += 1; //calculate total unhidden columns
                }
            }

            if (column.type.name === "CustomizedFooter") {
                React.Children.forEach(column.props.children, (foot, i) => {
                    footerMap.push(foot)
                });

            }

        })

        // pagination footer if is false don't show it
        let paginationFooter = (
            <Table.Row/>
        );

        //if need pagination or pagination type is primary,
        //add new footer include pagination menu and calculate data set
        if (pagination === true || pagination === "primary") {
            paginationFooter = (

                <PaginationFooter
                    colCount={colCount}
                    dataCount={data.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    handlePageClick={(val) => this.handlePageClick(val)}
                    onPageSizeChange={(val) => this.handlePageSizeChange(val)}
                    footerMap={footerMap}
                />

            );

            //dataSet pagination, based on current page
            dataSet = this.TablePagination(dataSet)

        } else if (pagination === "secondary") {
            paginationFooter = (
                <PaginationFooterSecondary
                    colCount={colCount}
                    dataCount={data.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    handlePageClick={(val) => this.handlePageClick(val)}
                    footerMap={footerMap}
                />
            )
            dataSet = this.TablePagination(dataSet)
        }

        const {
            selectable,
            color,
            unstackable,
            celled,
            basic,
            collapsing,
            compact,//"very"
            definition,
            inverted,
            fixed,
            padded,
            singleLine,
            sortable,
            stackable,
            verticalAlign
        } = this.props; // most common styles of semantic ui

        return (
            <div key={key}>
                <Table
                    celled={celled}
                    unstackable={unstackable}
                    selectable={selectable}
                    color={color}
                    basic={basic}
                    collapsing={collapsing}
                    compact={compact}
                    definition={definition}
                    inverted={inverted}
                    fixed={fixed}
                    padded={padded}
                    singleLine={singleLine}
                    sortable={sortable}
                    stackable={stackable}
                    verticalAlign={verticalAlign}
                >
                    <Table.Header>
                        <Table.Row>


                            {
                                headerMap.map((column, i) => {
                                    //console.log(column.props.textAlign)
                                    const collapsing = column.props.collapsing === undefined ? false : column.props.collapsing;
                                    let header = column.props.header === undefined ? 'undefined' : column.props.header;
                                    const textAlign = isStringEmpty(column.props.textAlign) ? 'center' : column.props.textAlign;
                                    const colAsCheckBox = column.props.colAsCheckBox === undefined ? false : column.props.colAsCheckBox;
                                    const accessor = column.props.accessor === undefined ? false : column.props.accessor;
                                    //TODO: structured table :  const rowSpan = column.props.rowSpan;

                                    // if customizeText is not none, call this function
                                    if (column.props.customizeText) {
                                        //call back function send header value and row object
                                        header = column.props.customizeText(header, column);
                                    }

                                    /*
                                       if and only if this column is shown as a check box and header shown as check all
                                       return the header as a checked all
                                    */
                                    if (showAllCheck === true && colAsCheckBox === true) {



                                        return (
                                            <Table.HeaderCell collapsing key={i}>
                                                <Checkbox
                                                    onChange={() => this.toggleCheckAll(accessor)}
                                                    checked={allChecked}
                                                />
                                            </Table.HeaderCell>
                                        )
                                    } else {

                                        //if this column can be sorted

                                        return (

                                            <Table.HeaderCell
                                                key={i}
                                                collapsing={collapsing}
                                                textAlign={textAlign}
                                                sorted={column === accessor ? direction : null}
                                                onClick={this.handleSort(accessor,sortable)}
                                            >
                                                {header}
                                            </Table.HeaderCell>

                                        );
                                    }


                                })
                            }

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>


                        {   //first loop for rendering rows
                            dataSet.map((column, i) => {
                                //console.log(i, column)

                                const {checkedIds} = this.state;

                                return (
                                    <Table.Row key={i} onClick={() => this.onRowSelectCallBack(column)}>

                                        {   //second loop for rendering cells
                                            headerMap.map((elm, j) => {

                                                //get value by accessor
                                                const accessor = elm.props.accessor === undefined ? '' : elm.props.accessor;
                                                const columnAlign = elm.props.accessor === undefined ? '' : elm.props.columnAlign;
                                                let value = column[accessor] === undefined ? '' : column[accessor];
                                                const colAsCheckBox = elm.props.colAsCheckBox === undefined ? false : elm.props.colAsCheckBox;
                                                const checkBoxStyle = elm.props.checkBoxStyle === undefined ? false : elm.props.checkBoxStyle;

                                                // if formatter is not none, call this function
                                                if (elm.props.columnFormat) {
                                                    //call back function send cell value and row object
                                                    value = elm.props.columnFormat(value, column);
                                                }

                                                //console.log(checkedIds)

                                                // if this column is set to be a check box ,then return a check box
                                                if (colAsCheckBox === true) {
                                                    return (
                                                        <Table.Cell collapsing key={j} textAlign={columnAlign}>
                                                            <ColumnCheckBox id={value}
                                                                            checkBoxStyle={checkBoxStyle}
                                                                            checked={checkedIds.includes(value) ? true : false}
                                                                            getCallBackId={(val) => this.modifyCheckedArray(val)}
                                                            />
                                                        </Table.Cell>
                                                    )
                                                } else { // if it is not a check box column, return as a simple column
                                                    return (
                                                        <Table.Cell key={j} textAlign={columnAlign}>{value}</Table.Cell>
                                                    );
                                                }

                                            })
                                        }

                                    </Table.Row>

                                );
                            })
                        }

                    </Table.Body>


                    <Table.Footer>
                        {paginationFooter}
                    </Table.Footer>

                </Table>

            </div>

        )
    }
}


export class PublicTableFooter extends React.Component {

    static propTypes = {
        header: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {
            header,
            accessor,
            textAlign,
            collapsing,
        } = this.props;
        return (
            <div header={header} accessor={accessor} textAlign={textAlign} collapsing={collapsing}/>
        )
    }
}


export class PublicTableHeaders extends React.Component {

    static propTypes = {
        header: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        accessor: PropTypes.string.isRequired,
        textAlign: PropTypes.string,
        collapsing: PropTypes.bool,
        columnFormat: PropTypes.func,
        customizeText: PropTypes.func,
        columnAlign: PropTypes.string,
        isHidden: PropTypes.bool,
        filterContext: PropTypes.string,
        colAsCheckBox: PropTypes.bool,
        checkBoxStyle: PropTypes.string,
        rowSpan:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }

    constructor(props) {
        super(props);
        /**
         *
         * @type {{header:the title and header of this column,
         *         accessor: the key of this column, most of times are the key of an JSON array,
         *         textAlign: "left,right,center",
         *         columnAlign: "left,right,center",
         *         collapsing: true or false, compact the space of this column,
         *         isHidden: true or false whether hide this column,
         *         filterContext: can always filter by this props, always be string.includes('filterContext'),
         *         colAsCheckBox: whether show this column as check boxes, at least need a accessor to be the value and id of the check box,
         *         styles: always be check box by default, can also be : slider,toggle,radio as well
         *       }}
         */
        this.state = {
            header: props.header,
            accessor: props.accessor,
            textAlign: props.textAlign === undefined ? "center" : props.textAlign,
            columnAlign: props.columnAlign === undefined ? "left" : props.columnAlign,
            collapsing: props.columnFormat === undefined ? false : props.columnFormat,
            isHidden: props.isHidden === undefined ? false : props.isHidden,
            filterContext: props.filterContext === undefined ? "" : props.filterContext,
            colAsCheckBox: props.colAsCheckBox === undefined ? false : props.colAsCheckBox,
            checkBoxStyle: props.checkBoxStyle === undefined ? "slider" : props.checkBoxStyle,
        }
    }


    //return is does not matter, the key is props
    render() {
        return (
            <div/>
        )
    }
}


class ColumnCheckBox extends React.Component {

    static propTypes = {
        id: PropTypes.any,
        checked: PropTypes.bool.isRequired,
        getCallBackId: PropTypes.func.isRequired,
        checkBoxStyle: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked,
            checkBoxStyle: props.checkBoxStyle,
            id: props.id,
        }

    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        this.setState({
            checked: nextProps.checked,
        });

    }

    toggle = () => {
        const {checked, id} = this.state;
        this.setState({checked: !checked});
        this.props.getCallBackId(id);
    }

    render() {

        const {checked, checkBoxStyle} = this.state;
        //styles¬:[slider,toggle,radio];

        let isSlider = false;
        let isRadio = false;
        let isToggle = false;

        //set check box style.
        if (checkBoxStyle !== undefined) {
            switch (checkBoxStyle) {
                case "slider":
                    isSlider = true;
                    break;
                case "radio":
                    isRadio = true;
                    break;
                case "toggle":
                    isToggle = true;
                    break;
                default:
                    isSlider = true;
                    break;
            }
        }

        return (
            <Checkbox
                slider={isSlider}
                radio={isRadio}
                toggle={isToggle}
                onChange={this.toggle}
                checked={checked}
            />
        )
    }
}


import React from 'react'
import {Checkbox, Table} from 'semantic-ui-react'
import PropTypes from "prop-types";
import {NoPaginationUserFooter, PaginationFooter, PaginationFooterSecondary} from "./PublicTableFooters";
import {getRandomNumber, isStringEmpty} from "../static/ObjectsUtils";
import _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';
import DefaultResponsiveTableBody from "./DefaultResponsiveTableBody";

//import update from "immutability-helper";


/**
 *
 * @author:RockyChen
 *
 * @abstract:
 *  Universal table element
 *
 * @style:
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
        /**
         * data format is JSON array
         * [ {name:"Tom"},{age:16} ]
         */
        data: PropTypes.array.isRequired,
        /**
         * first header cell shown as a select all check box
         */
        showAllCheck: PropTypes.bool,
        /**
         * pass the value of internal onCheckBoxChange
         * <PublicTables data={dummy_data}  checkedCallBackFunction={(val) => console.log(val)}>
         */
        checkedCallBackFunction: PropTypes.func,
        /**
         * pass the selected row data
         */
        onRowSelectCallBack: PropTypes.func,
        /**
         * 2 different type of pagination bar
         */
        pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(["primary", "secondary"])]),
        /**
         * currently only support hard-coded : 10 ,20 , 50
         */
        pageSize: PropTypes.PropTypes.oneOf([10, 20, 50]),
        /**
         * should combine with function onRowSelectCallBack
         * <PublicTables selectable onRowSelectCallBack={(row)=>console.log(row)}>
         */
        selectable: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         * using Lodash sort method.
         */
        sortable: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         * red,orange,yellow,olive,green,teal,blue,violet,purple,pink,brown,grey,black
         */
        color: PropTypes.PropTypes.oneOf(["red", "orange", "yellow", "olive", "green", "teal",
            "blue", "violet", "purple", "pink", "brown", "grey", "black"]),
        /**
         * semantic-ui builtin prop
         * small,large
         */
        tableSize: PropTypes.PropTypes.oneOf(["small", "large"]),
        /**
         * semantic-ui builtin prop
         */
        unstackable: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         */
        celled: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         */
        basic: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),//"very"
        /**
         * semantic-ui builtin prop
         */
        collapsing: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         */
        compact: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),//"very"
        /**
         * semantic-ui builtin prop
         */
        definition: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         */
        inverted: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         */
        attached: PropTypes.PropTypes.oneOf(["top", "bottom"]),
        fixed: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         */
        padded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        /**
         * semantic-ui builtin prop
         */
        singleLine: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         */
        stackable: PropTypes.bool,
        /**
         * semantic-ui builtin prop
         */
        verticalAlign: PropTypes.oneOf(['bottom', 'middle', 'top']),
        /**
         * not done yet
         */
        structured: PropTypes.bool,
        /**
         * checkBox default values , should be an array
         */
        defaultCheckedIds: PropTypes.array,
        /**
         * set particular as green color to highlight
         * param is the data of each row
         *
         * rowHighLightFunction(rowData){
         *    return row.id === "some id"
         * }
         * return true, then set the row to green color
         */
        rowHighLightFunction: PropTypes.func,
        /**
         * this will disable pagination,
         * so we can use our database pagination
         * to saving time
         */
        fakePagination: PropTypes.bool,
        /**
         * pagination call back function
         */
        onPageChangeCallBack: PropTypes.func,
        /**
         * fake pagination need a data sum count
         */
        fakeDataSum: PropTypes.number,
        /**
         * sometimes, we have to re-render the row
         */
        rowRenderCallback: PropTypes.func,
        /**
         * we can set responsive param to re-render the table body
         */
        defaultResponsiveParam: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        /**
         * we can add props of pagination bar
         */
        paginationProps: PropTypes.object,
        striped : PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            sortedData: props.data,
            showAllCheck: props.showAllCheck === undefined ? false : props.showAllCheck,
            pagination: props.pagination === undefined ? false : props.pagination,
            pageSize: (props.pageSize === undefined) || !([10, 20, 50].includes(props.pageSize)) ? 20 : props.pageSize,
            allChecked: false,
            checkedIds: props.defaultCheckedIds === undefined ? [] : props.defaultCheckedIds,
            currentPage: 1,
            column: null,
            direction: null,
            key: getRandomNumber(1000000000),
            bodyKey: getRandomNumber(1000000000),
            tableWidth: -1,
            tableHeight: -1,
        };
    }

    onResize = (width, height) => {

        this.setState({
            tableWidth: width,
            tableHeight: height,
        });
    }

    handlePageSizeChange = (value) => {
        this.setState({
                pageSize: parseInt(value, 10),
            }
        );
    }


    componentWillReceiveProps(newProps) {

        const {data, defaultCheckedIds, fakePagination, defaultResponsiveParam} = newProps;
        /*
         *  for performance reason. avoid useless re-render
         *  re-render entire component when pass new data
         */
        if (data !== this.state.data) {
            this.setState({
                data: data,
                sortedData: data,
            });

            if (fakePagination) { // if is fake Pagination, means need to refresh the body of table
                this.setState({
                    bodyKey: getRandomNumber(1000000000),
                });
            } else {
                this.setState({ // otherwise need to refresh everything
                    key: getRandomNumber(1000000000),
                });
            }

        }

        /*
         * reset checked ids
         */
        if (defaultCheckedIds !== this.props.defaultCheckedIds) {
            this.setState({
                checkedIds: defaultCheckedIds,
            });
        }


    }


    /* shouldComponentUpdate(nextProps, nextState){
         console.log(nextProps === this.props)
         return true;
     }*/

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
        const totalPage = Math.ceil((ParamArr === undefined ? 1 : ParamArr.length) / pageSize)

        //in case total page is less than current page
        const currentByTotal = totalPage < currentPage ? 1 : currentPage

        return ParamArr.slice((currentByTotal - 1) * pageSize, (currentByTotal) * pageSize);
    }


    // onPageChange
    handlePageClick = (data) => {
        //console.log(data);
        this.setState({
            currentPage: data
        });

        if (this.props.onPageChangeCallBack) {
            this.props.onPageChangeCallBack(data)
        }
    };

    /* check all button click
       using given accessor
    */
    toggleCheckAll = (accessor, dataSet) => {
        const {allChecked, checkedIds} = this.state;
        //console.log(accessor)
        this.setState({allChecked: !allChecked});

        //let currentPageList = dataSet;

        if (!allChecked === true) {
            for (let i = 0; i < dataSet.length; i++) {
                checkedIds.push(dataSet[i][accessor]);
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

    handleSort = (clickedColumn, sortable) => () => {

        if (sortable) {
            const {column, sortedData, direction} = this.state

            if (column !== clickedColumn) {
                this.setState({
                    column: clickedColumn,
                    sortedData: _.sortBy(sortedData, [clickedColumn]),
                    direction: 'ascending',
                })

                return
            }

            this.setState({
                sortedData: sortedData.reverse(),
                direction: direction === 'ascending' ? 'descending' : 'ascending',
            })
        }
    }

    onCellSelected(elm, value, column) {
        //console.log(elm.props.onCellSelectCallBack)
        if (elm.props.onCellSelectCallBack) {
            elm.props.onCellSelectCallBack(value, column)
        }
    }

    render() {
        const {
            sortedData,
            pageSize,
            key,
            allChecked,
            showAllCheck,
            pagination,
            currentPage,
            direction,
            bodyKey,
            tableWidth
        } = this.state;


        let colCount = 0; // calculate the total columns
        const headerMap = [];//headerMap, check props
        const hiddenHeaderMap = [];
        const footerMap = [];

        let dataSet = Object.assign([], sortedData);//always assign to a new Array to avoid pointer issue.

        React.Children.forEach(this.props.children, (column, i) => {

            //console.log(column, column.type.name);
            // type should be PublicTableHeaders tableHeader, if cannot read element type , read default props
            let tableElementType = column.props.tableElementType;
            if (column.type.name === "PublicTableHeaders" || tableElementType === "PublicTableHeaders") {

                /*
                 * TODO: customization filter function using loadash  needed:
                 * give a dataSet as arg[], give a dataSet Back, that means can write
                 * customized filters such as :
                 * 1 using 'greater than' or 'less than',
                 * 2 filterText === colVal || something || something
                 */
                const {accessor, filterContext, isHidden} = column.props;
                //filter dataSet by accessor and filterContext
                if (filterContext !== undefined && filterContext !== null && filterContext !== '') {
                    //console.log(filterContext)
                    dataSet = filterDataByFilterContext(accessor, filterContext, dataSet)
                }

                //only push not hidden element
                if (isHidden !== true) {
                    headerMap.push(column); // push unhidden columns in array for looping
                    colCount += 1; //calculate total unhidden columns
                } else {
                    hiddenHeaderMap.push(column);
                }
            }
            // type should be CustomizedFooter , if cannot read element type , read default props
            if (column.type.name === "CustomizedFooter" || tableElementType === "CustomizedFooter") {
                React.Children.forEach(column.props.children, (foot, i) => {
                    footerMap.push(foot);
                });

            }

        });

        const {paginationProps} = this.props;

        //console.log(headerMap, footerMap);
        // pagination footer if is false don't show it
        let paginationFooter = (
            <Table.Row/>
        );


        if (!_.includes([true, "primary", "secondary"], pagination) && footerMap.length > 0) {
            paginationFooter = (
                <NoPaginationUserFooter colCount={colCount} footerMap={footerMap}/>
            );
        }

        const {fakePagination, fakeDataSum} = this.props;

        if (fakePagination) { // fake pagination don't need to manipulate data inside of this table utils
            //if need pagination or pagination type is primary,
            //add new footer include pagination menu and calculate data set
            if (pagination === true || pagination === "primary" || pagination === "secondary") {
                paginationFooter = (
                    <PaginationFooterSecondary
                        colCount={colCount}
                        dataCount={fakeDataSum}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        handlePageClick={(val) => this.handlePageClick(val)}
                        footerMap={footerMap}
                        paginationProps={paginationProps}
                    />
                );
                // dataSet = this.TablePagination(dataSet)
            }

        } else {
            //if need pagination or pagination type is primary,
            //add new footer include pagination menu and calculate data set
            if (pagination === true || pagination === "primary") {
                paginationFooter = (
                    <PaginationFooter
                        colCount={colCount}
                        dataCount={dataSet.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        handlePageClick={(val) => this.handlePageClick(val)}
                        onPageSizeChange={(val) => this.handlePageSizeChange(val)}
                        footerMap={footerMap}
                        paginationProps={paginationProps}
                    />
                );
                //dataSet pagination, based on current page
                dataSet = this.TablePagination(dataSet)

            } else if (pagination === "secondary") {
                paginationFooter = (
                    <PaginationFooterSecondary
                        colCount={colCount}
                        dataCount={dataSet.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        handlePageClick={(val) => this.handlePageClick(val)}
                        footerMap={footerMap}
                        paginationProps={paginationProps}
                    />
                )
                dataSet = this.TablePagination(dataSet)
            }
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
            verticalAlign,
            tableSize,
            attached,
            style,
            columns,
            striped,
        } = this.props; // most common styles of semantic ui

        return (
            <Table
                key={key}
                celled={celled}
                attached={attached}
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
                size={tableSize}
                style={style}
                columns={columns}
                striped={striped}
            >
                <Table.Header>
                    <Table.Row>

                        {
                            headerMap.map((column, i) => {

                                const {accessor, colAsCheckBox, textAlign, collapsing, customizeText} = column.props;
                                let header = column.props.header === undefined ? 'undefined' : column.props.header;
                                //TODO: structured table :  const rowSpan = column.props.rowSpan;

                                // if customizeText is not none, call this function
                                if (customizeText) {
                                    //call back function send header value and row object
                                    header = customizeText(header, column);
                                }

                                /*
                                   if and only if this column is shown as a check box and header shown as check all
                                   return the header as a checked all
                                */
                                if (showAllCheck === true && colAsCheckBox === true) {

                                    return (
                                        <Table.HeaderCell collapsing key={i}>
                                            <Checkbox
                                                onChange={() => this.toggleCheckAll(accessor, dataSet)}
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
                                            onClick={this.handleSort(accessor, sortable)}
                                        >
                                            {header}
                                        </Table.HeaderCell>

                                    );
                                }


                            })
                        }

                    </Table.Row>
                </Table.Header>

                <Table.Body key={bodyKey}>

                    {   //first loop for rendering rows
                        dataSet.map((column, i) => {
                            //console.log(i, column)

                            const {checkedIds} = this.state;

                            const {rowHighLightFunction, rowRenderCallback, defaultResponsiveParam} = this.props;

                            let isHighLight = false;

                            let newRow = "";

                            if (rowHighLightFunction) {
                                isHighLight = rowHighLightFunction(column);
                            }

                            /*
                             * if we set a default responsive param
                             *
                             * return a <Item/> instead of table
                             */
                            if (!_.isEmpty(defaultResponsiveParam)) {

                                const {
                                    widthThreshold
                                } = defaultResponsiveParam;

                                const minimumWidth = isStringEmpty(widthThreshold) ? 480 : _.parseInt(widthThreshold, 10);

                                // if the size less than equals the threshold
                                if (tableWidth <= minimumWidth) {
                                    return (
                                        <Table.Row key={i}>
                                            <Table.Cell colSpan={colCount}>
                                                <DefaultResponsiveTableBody
                                                    {...this.props}
                                                    headerMap={headerMap}
                                                    dataSet={column}
                                                    hiddenHeaderMap={hiddenHeaderMap}
                                                    checkedIds={checkedIds}
                                                    modifyCheckedArray={(val) => this.modifyCheckedArray(val)}
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }
                            }

                            /*
                             * the call back is the whole row.
                             *
                             * if have not return anything, when do not re-render this
                             *
                             * if have something, we re-render
                             *
                             */
                            if (rowRenderCallback) {
                                newRow = rowRenderCallback(column, i);

                                if (!isStringEmpty(newRow)) {
                                    return newRow
                                }
                            }

                            return (
                                <Table.Row key={i} onClick={() => this.onRowSelectCallBack(column)}
                                           positive={isHighLight}>

                                    {   //second loop for rendering cells
                                        headerMap.map((elm, j) => {

                                            const {
                                                checkBoxStyle,
                                                selectable,
                                                accessor,
                                                columnAlign,
                                                colAsCheckBox,
                                                columnFormat,
                                            } = elm.props;

                                            //get value by accessor
                                            let value = column[accessor] === undefined ? '' : column[accessor];

                                            // if formatter is not none, call this function
                                            if (columnFormat) {
                                                //call back function send cell value and row object
                                                value = columnFormat(value, column);
                                            }


                                            //console.log(checkedIds)

                                            // if this column is set to be a check box ,then return a check box
                                            if (colAsCheckBox === true) {
                                                return (
                                                    <Table.Cell collapsing key={j} textAlign={columnAlign}
                                                                selectable={false}>
                                                        <ColumnCheckBox id={value}
                                                                        checkBoxStyle={checkBoxStyle}
                                                                        checked={_.includes(checkedIds, value)}
                                                                        getCallBackId={(val) => this.modifyCheckedArray(val)}
                                                        />
                                                    </Table.Cell>
                                                )
                                            } else { // if it is not a check box column, return as a simple column
                                                return (
                                                    <Table.Cell key={j}
                                                                textAlign={columnAlign}
                                                                selectable={selectable}
                                                                onClick={() => this.onCellSelected(elm, value, column)}
                                                    >
                                                        {value}
                                                    </Table.Cell>
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
                <Table.Footer>
                    <Table.Row>
                        <Table.Cell colSpan={colCount}>
                            <ReactResizeDetector
                                handleWidth
                                handleHeight
                                onResize={this.onResize}
                            />
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer>

            </Table>
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


export class ColumnCheckBox extends React.Component {

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
            id: nextProps.id,
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
                    isSlider = false;
                    isRadio = false;
                    isToggle = false;
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


//filter the column by given params
function filterDataByFilterContext(columnAccessor, filterContext, dataSet) {

    return _.filter(dataSet, function (ele) {
        //always using toSting() to simplify the compare
        const origin = _.lowerCase(_.toString(ele[columnAccessor]));  //"string" === typeof ele[columnAccessor] ? ele[columnAccessor] : ele[columnAccessor].toString();
        const filter = _.lowerCase(_.toString(filterContext)); //"string" === typeof filterContext ? filterContext : filterContext.toString();
        //console.log(origin,filter)
        return _.includes(origin, filter) //origin.includes(filter);
    });
}
import React from "react";
import PropTypes from "prop-types";

export default class PublicTableHeaders extends React.Component {

    static propTypes = {
        /**
         * the title and header of this column
         */
        header: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]).isRequired,
        /**
         * the key of an JSON array,
         */
        accessor: PropTypes.string.isRequired,
        /**
         * align style only works on "Table Header",
         */
        textAlign: PropTypes.PropTypes.oneOf(["left", "right", "center"]),
        /**
         * align style only works on "Table Body",
         */
        columnAlign: PropTypes.PropTypes.oneOf(["left", "right", "center"]),
        /**
         * semantic-ui builtin prop
         * works on the column
         */
        collapsing: PropTypes.bool,
        /**
         *  call back function pass cell data and row data
         *  <PublicTableHeaders
         columnFormat={(cellValue, rowObject) => console.log(cellValue, rowObject)}
         />
         */
        columnFormat: PropTypes.func,
        /**
         *   unlike columnFormat,
         *   only re-write the header text instead of all the column
         *   will works on structured table for re-writing headers.
         *   <PublicTableHeaders
         customizeText={(cellValue, rowObject) => console.log(cellValue, rowObject)}
         />
         */
        customizeText: PropTypes.func,
        /**
         * set this column to hidden.
         * For instance, this column need a specific filter function, but does not need to show.
         */
        isHidden: PropTypes.bool,
        /**
         * pass a dynamic text in your state
         * will always using String.include()
         */
        filterContext: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]),
        /**
         * this column will be shown as check box instead of text ,
         * and check box value will according to your accessor
         */
        colAsCheckBox: PropTypes.bool,
        /**
         * using semantic check box types
         * such as "slider", "radio", "toggle"
         */
        checkBoxStyle: PropTypes.PropTypes.oneOf(["slider", "radio", "toggle"]),
        /**
         * for structured table, not done yet
         */
        rowSpan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /**
         * semantic built in props
         */
        selectable: PropTypes.bool,
        /**
         * semantic built in props
         */
        onCellSelectCallBack: PropTypes.func,
        onHeaderClickCallBack: PropTypes.func,
        notSortable: PropTypes.bool,
        /**
         * highlight search text
         */
        highLightFilterText: PropTypes.bool,
        notCheckableCondition : PropTypes.func,
    };

    static defaultProps = {
        tableElementType: "PublicTableHeaders",
    };

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
            selectable: props.selectable,
            onCellSelectCallBack: props.onCellSelectCallBack,
        }
    }


    //return is does not matter, the key is props
    render() {
        return (
            <PublicTableHeaders {...this.props}/>
        )
    }
}
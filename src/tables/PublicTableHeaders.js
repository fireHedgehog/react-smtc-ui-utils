import React from "react";
import PropTypes from "prop-types";

export default class PublicTableHeaders extends React.Component {

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
        rowSpan: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }

    static defaultProps = {
        tableElementType: "PublicTableHeaders",
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
            <PublicTableHeaders {...this.props}/>
        )
    }
}
import React from 'react'
import PropTypes from "prop-types";
import {Item} from "semantic-ui-react";
import {isStringEmpty} from "../static/ObjectsUtils";
import _ from "lodash";
import {ColumnCheckBox} from "./PublicTables";

export default class DefaultResponsiveTableBody extends React.Component {

    static propTypes = {
        defaultResponsiveParam: PropTypes.object,
        headerMap: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        dataSet: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        hiddenHeaderMap: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    modifyCheckedArray(val){
        const {modifyCheckedArray} = this.props;
        if(modifyCheckedArray){
            modifyCheckedArray(val);
        }
    }

    render() {
        const {} = this.state;

        const {defaultResponsiveParam, headerMap, dataSet, hiddenHeaderMap,checkedIds} = this.props;

        const {
            image,
            header,
            meta,
            description,
            extra,
            unstackable,
        } = defaultResponsiveParam;

        const checkBox = findCheckBox(headerMap, hiddenHeaderMap);

        let checkBoxDiv = (<div/>);

        if (!_.isEmpty(checkBox)) {
            const {checkBoxStyle, accessor} = checkBox;

            const value = dataSet[accessor] === undefined ? '' : dataSet[accessor];

            checkBoxDiv = (
                <ColumnCheckBox id={value}
                                checkBoxStyle={checkBoxStyle}
                                checked={_.includes(checkedIds, value)}
                                getCallBackId={(val) => this.modifyCheckedArray(val)}
                />
            );
        }


        return (
            <Item.Group divided unstackable={unstackable}>
                <Item>

                    {renderImage(headerMap, dataSet, image, this.props, hiddenHeaderMap)}
                    <Item.Content>
                        {checkBoxDiv}
                        {renderHeader(headerMap, dataSet, header, this.props, hiddenHeaderMap)}
                        {renderMeta(headerMap, dataSet, meta, this.props, hiddenHeaderMap)}
                        {renderDescription(headerMap, dataSet, description, this.props, hiddenHeaderMap)}
                        {renderExtra(headerMap, dataSet, extra, this.props, hiddenHeaderMap)}

                    </Item.Content>
                </Item>
            </Item.Group>

        )
    }
}

function renderImage(headerMap, dataSet, image, parentProps, hiddenHeaderMap) {

    if (isStringEmpty(image) || _.isEmpty(image)) {
        return null;
    }

    const {accessor, size} = image;

    const src = dataSet[accessor];

    return (
        <Item.Image
            size={isStringEmpty(size) ? "tiny" : size}
            src={src}
        />
    );
}

function renderHeader(headerMap, dataSet, header, parentProps, hiddenHeaderMap) {

    if (isStringEmpty(header) || _.isEmpty(header)) {
        return null;
    }

    const {accessor, prefix, suffix, enableColFormat} = header;

    let content = generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix);

    if (enableColFormat) {
        content = colFormatter(headerMap, hiddenHeaderMap, accessor, content, dataSet);
    }


    return (
        <Item.Header
            content={content}
        />
    );
}

function renderMeta(headerMap, dataSet, meta, parentProps, hiddenHeaderMap) {

    if (isStringEmpty(meta) || _.isEmpty(meta)) {
        return null;
    }
    const {accessor, prefix, suffix, enableColFormat} = meta;

    let content = generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix);

    if (enableColFormat) {
        content = colFormatter(headerMap, hiddenHeaderMap, accessor, content, dataSet);
    }


    return (
        <Item.Meta
            content={content}
        />
    );
}

function renderDescription(headerMap, dataSet, description, parentProps, hiddenHeaderMap) {

    if (isStringEmpty(description) || _.isEmpty(description)) {
        return null;
    }
    const {accessor, prefix, suffix, enableColFormat} = description;

    let content = generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix);

    if (enableColFormat) {
        content = colFormatter(headerMap, hiddenHeaderMap, accessor, content, dataSet);
    }

    return (
        <Item.Description
            content={content}
        />
    )
}

function renderExtra(headerMap, dataSet, extra, parentProps, hiddenHeaderMap) {

    if (isStringEmpty(extra) || _.isEmpty(extra)) {
        return null;
    }

    const {accessor, prefix, suffix, enableColFormat} = extra;

    let content = generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix);

    if (enableColFormat) {
        content = colFormatter(headerMap, hiddenHeaderMap, accessor, content, dataSet);
    }


    return (
        <Item.Extra
            content={content}
        />
    );
}


function generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix) {
    //console.log(dataSet[accessor])
    let content = isStringEmpty(dataSet[accessor]) ? "" : dataSet[accessor];

    if (!isStringEmpty(prefix)) {
        content = prefix + content;
    }

    if (!isStringEmpty(suffix)) {
        content = content + suffix;
    }

    return content;
}

function colFormatter(headerMap, hiddenHeaderMap, responsiveAccessor, content, dataSet) {

    let colFormat = _.findLast(headerMap, function (element) {
        const {accessor} = element.props;
        return accessor === responsiveAccessor;
    });

    if (_.isEmpty(colFormat)) {
        colFormat = _.findLast(hiddenHeaderMap, function (element) {
            const {accessor} = element.props;
            return accessor === responsiveAccessor;
        });
    }

    if (!_.isEmpty(colFormat)) {
        const {columnFormat} = colFormat.props;

        if (columnFormat) {
            return columnFormat(content, dataSet);
        }
    }

    return "";

}

function findCheckBox(headerMap, hiddenHeaderMap) {

    let checkBox = _.findLast(headerMap, function (element) {
        const {colAsCheckBox} = element.props;
        return colAsCheckBox === true;
    });

    if (_.isEmpty(checkBox)) {
        checkBox = _.findLast(hiddenHeaderMap, function (element) {
            const {colAsCheckBox} = element.props;
            return colAsCheckBox === true;
        });
    }

    if (!_.isEmpty(checkBox)) {

        return checkBox.props;
    }

    return null;

}
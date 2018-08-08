import React from 'react'
import PropTypes from "prop-types";
import {Item} from "semantic-ui-react";
import {isStringEmpty} from "../static/ObjectsUtils";

export default class DefaultResponsiveTableBody extends React.Component {

    static propTypes = {
        defaultResponsiveParam: PropTypes.object,
        headerMap: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        dataSet: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    }

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const {} = this.state;

        const {defaultResponsiveParam, headerMap, dataSet} = this.props;

        const {
            image,
            header,
            meta,
            description,
            extra
        } = defaultResponsiveParam;


        return (
            <Item.Group divided>
                <Item>
                    {renderImage(headerMap, dataSet, image, this.props)}
                    <Item.Content>
                        {renderHeader(headerMap, dataSet, header, this.props)}
                        {renderMeta(headerMap, dataSet, meta, this.props)}
                        {renderDescription(headerMap, dataSet, description, this.props)}
                        {renderExtra(headerMap, dataSet, extra, this.props)}

                    </Item.Content>
                </Item>
            </Item.Group>

        )
    }
}

function renderImage(headerMap, dataSet, image, parentProps) {

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

function renderHeader(headerMap, dataSet, header, parentProps) {

    if (isStringEmpty(header) || _.isEmpty(header)) {
        return null;
    }

    const {accessor, prefix, suffix} = header;

    const content = generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix);

    return (
        <Item.Header
            content={content}
        />
    );
}

function renderMeta(headerMap, dataSet, meta, parentProps) {

    if (isStringEmpty(meta) || _.isEmpty(meta)) {
        return null;
    }
    const {accessor, prefix, suffix} = meta;

    const content = generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix);

    return (
        <Item.Meta
            content={content}
        />
    );
}

function renderDescription(headerMap, dataSet, description, parentProps) {

    if (isStringEmpty(description) || _.isEmpty(description)) {
        return null;
    }
    const {accessor, prefix, suffix} = description;

    const content = generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix);
    return (
        <Item.Description
            content={content}
        />
    )
}

function renderExtra(headerMap, dataSet, extra, parentProps) {

    if (isStringEmpty(extra) || _.isEmpty(extra)) {
        return null;
    }

    const {accessor, prefix, suffix} = extra;

    const content = generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix);

    return (
        <Item.Extra
            content={content}
        />
    );
}


function generateDataByPreAndSuffix(dataSet, accessor, prefix, suffix) {
    let content = dataSet[accessor];

    if (!isStringEmpty(prefix)) {
        content = prefix + content;
    }

    if (!isStringEmpty(suffix)) {
        content = content + suffix;
    }

    return content;
}
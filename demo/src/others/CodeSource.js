import React from 'react';
import _ from "lodash";

function renderLinks(examplePath, name) {
    const gitHubBase = 'https://github.com/fireHedgehog/react-smtc-ui-utils/tree/master';
    let labelName = "Source code:";
    if (!_.isEmpty(name)) {
        labelName = name;
    }
    return (
        <h5>
            {labelName}
            <a href={`${gitHubBase}/${examplePath}`} target='_blank'> /demo/src/table/{examplePath}</a>
        </h5>
    );
}

export default renderLinks;

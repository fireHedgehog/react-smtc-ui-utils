import React from 'react';

function renderLinks(examplePath) {
  const gitHubBase = 'https://github.com/fireHedgehog/react-smtc-ui-utils/tree/master';
  return (
    <h5>
      Source code:
      <a href={ `${gitHubBase}/${examplePath}` } target='_blank'> /demo/src/table/{ examplePath }</a>
    </h5>
  );
}

export default renderLinks;

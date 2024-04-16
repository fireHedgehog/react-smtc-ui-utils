import React, {useCallback} from 'react';
import {useResizeDetector} from 'react-resize-detector';

const ResizeDetector = ({onResizeCallback}) => {
    const onResize = useCallback((width, height) => {
        if (onResizeCallback) {
            onResizeCallback(width, height);
        }
    }, [onResizeCallback]);

    const {ref} = useResizeDetector({
        handleHeight: true,
        refreshMode: 'debounce',
        refreshRate: 1000,
        onResize: onResize,
    });

    return <div ref={ref}/>;
};

export default ResizeDetector;

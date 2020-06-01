import React, { useEffect, useState, useRef } from 'react';
import { Spinner, Button } from 'react-bootstrap';

function LoadingButton({ children, loading, ...props }) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && ref.current.getBoundingClientRect().width) {
            setWidth(ref.current.getBoundingClientRect().width);
        }
        if (ref.current && ref.current.getBoundingClientRect().height) {
            setHeight(ref.current.getBoundingClientRect().height);
        }
    }, [children]);

    return (
        <Button
            disabled={loading}
            ref={ref}
            style={
                width && height
                    ? {
                          width: `${width}px`,
                          height: `${height}px`
                      }
                    : {}
            }
            {...props}
        >
            {loading ? (
                <Spinner size="sm" animation="border" variant="light" />
            ) : (
                children
            )}
        </Button>
    );
}

export default LoadingButton;

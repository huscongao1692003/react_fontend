import Overlay from 'react-bootstrap/Overlay';
import React, { useState } from 'react';

const OverlayCustom = ( { show } ) => {

    const target = useRef(null);

    return (
        <Overlay target={target.current} show={show} placement="right">
            <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              color: 'white',
              borderRadius: 3
            }}
          >
            Simple tooltip
          </div>
        </Overlay>
    )

}

export default OverlayCustom;
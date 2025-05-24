import React from 'react';
import { RotateLoader } from 'react-spinners';

const LoadingAnimated = () => {
    return (
        <section className='loader_background' >
            <div  className='loader_center'>
              <RotateLoader color="#D12149" />
            </div>
        </section>
    );
};

export default LoadingAnimated;
 
import { animationCreate } from '@/utils/utils';
import React, {useEffect} from 'react';
import BackToTop from '../lib/BackToTop';
import FooterTwo from './footers/footer-2';
import HeaderTwo from './headers/header-2';

const WrapperTwo = ({children}) => {
    useEffect(() => {
        setTimeout(() => {
          animationCreate()
        }, 500);
      },[])

    return (
        <>
        <HeaderTwo />
            {children}
            <FooterTwo />
            <BackToTop />
        </>
    );
};

export default WrapperTwo;
import React from 'react';
import SEO from '../common/seo';
import BlogUser from '../components/blog-user';
import WrapperFour from '../layout/wrapper-4';


const index = () => {
    return (
        <>
        <WrapperFour>
            <SEO pageTitle={"ViewPost"}/>
            <BlogUser/>
        </WrapperFour>
        </>
    );
};

export default index;

import SEO from "../common/seo";
import Home from "../components/homes/home";
import WrapperFour from "../layout/wrapper-4";


const index = () => {
  return (

    <WrapperFour>
      <SEO pageTitle={'Epora'} />
      <Home />
    </WrapperFour>
  );
};

export default index;
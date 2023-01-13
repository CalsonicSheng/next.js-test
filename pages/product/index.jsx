import Link from 'next/link';
import { useEffect } from 'react';

// this "index" file under "product" folder MUST be created for navigating to "/product" route | otherwise a 404 page is returned

export default function Product({ data }) {
  useEffect(() => {
    console.log('product useEffect callback runs');
  });

  console.log('product page react code run');
  return (
    <div className="style-div">
      <h4>Product main page</h4>
      <p>{data}</p>
      {/* "replace" will replace the current full navigation history url stack instead of adding a new url into the stack. */}
      {/* this will cause go-back to go all the way back to home page */}
      <Link href={'/product/product-detail'} replace>
        detail
      </Link>
    </div>
  );
}

// the goal of "getStaticProps" is to fetch any INITIAL external data at BUILD TIME ONLY ONCE at SERVER-SIDE and INCORPORATE DATA INTO PAGE FUNCTIONAL COMPONENT
// for "static-pathed" SG page url, "getStaticProps" can be used alone WITHOUT getStaticPaths (very important)
export async function getStaticProps() {
  // as we have tested, getStaticProps's return a object that must follow below convetion
  // the entire "object" assigned to the "props" key will be directly used as actual object value for the corresponding above react page functional component's props
  console.log('product page getStaticProps run');
  return {
    props: {
      data: 'external SECOND data fetched and returned by getStaticProps',
    },
    revalidate: 3,
  };
}

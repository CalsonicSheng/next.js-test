import { useRouter } from 'next/router';

export default function ProductId({ data }) {
  const router = useRouter();

  // this will return {productIdn: '1'}, which is to return url dynamic path params (this is different from context.query from getSeverSideProps) "productIdn" matches with file naming exactly
  console.log(router.query);
  const { productIdn } = router.query;

  return (
    <div className="style-div">
      <h3>productId obtained from router query: {productIdn}</h3>
      <h3>{data}</h3>
      <p>{data}</p>
    </div>
  );
}

// the purpose of "getStaticPaths" is to PRE-DETERMINE total number of dynamic pages/routes + each of dynamic url path value for getStaticProps to run in "BUILD TIME" TO PRE-RENDER HTML FILE
// also if "getStaticProps" function needs to access such "url dynamic path", it can only get it from "getStaticPaths" (very important)
export async function getStaticPaths() {
  // as we have tested, you have to follow exact the naming convention for the return object as "params" key must be used exactly and "productIdn" key must match with dynamic file naming
  return {
    paths: [
      {
        params: { productIdn: '1' },
      },
      {
        params: { productIdn: '2' },
      },
      {
        params: { productIdn: '3' },
      },
    ],
    fallback: false,
  };
}

// if "getStaticProps" function is used under a dynamic page, then "getStaticPaths" must be used | also without "getStaticProps", "getStaticPaths" does nothing (as we have tested)
// this is because "getStaticProps" function will BE AUTO executed by the next.js framework ONLY AT BUILD-TIME ON SERVER-SIDE, without PRE-DETERMINING TOTAL dynamic pages/url using
// "getStaticPaths",then next/js framework will NOT KNOW HOW MANY TIMES "getStaticProps" should be executed for each dynamic page AT BUILD TIME (this is very important to realize)

// with "getStaticPaths" determined above, THIS SAME react page functional component code along with "getStaticProps" will be used and called EACH TIME at EACH DIFFERENT PRE-DETERMINED
// DYNAMIC url to pre-render different corresponding static generated HTML file AT BUILD TIME ON SERVER-SIDE FOR ONLY 3 TIMES (very important)

// by convention, we typically use "context" as parameter name | but this is up to you
export async function getStaticProps(context) {
  const { productIdn } = context.params;

  console.log(`product ${productIdn} getStaticProps runs`);

  return {
    props: {
      data: `this is product id obtained from getStaticProps: ${productIdn}`,
    },
  };
}

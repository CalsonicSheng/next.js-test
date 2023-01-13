import { useState } from 'react';

export default function About({ data }) {
  console.log('About page react code run');

  const [counter, setCounter] = useState(() => {
    console.log(window.innerWidth);
    console.log('about page useState callback runs');
    return 3;
  });

  return (
    <div className="style-div">
      <h1>about page</h1>
      <p>{counter}</p>
      <p>{data}</p>
    </div>
  );
}

// under SSR process, the corresponding html file for "about" page is NOT generated/rendered and "getServerSideProps" is also NOT executed at build time (very important)
// WE HAVE TESTED, ONLY "getServerSideProps" will run at server side ONLY AT EACH navigation (not at build time)
// WE HAVE TESTED, under SSR, all react code will NOT run at server side and not generate a html file on Serverside, but ONLY RUN to render page AT CLIENT SIDE (much like REACT)
// all the extneral fetching operation run at server-side but the frontend html and your react code ARE GENERATED/UTILIZED ONLY AT CLIENT-SIDE
// "getServerSideProps" naming MUST BE EXACT same as "getStaticProps" (very important)
export async function getServerSideProps() {
  console.log('about page SSR runs');
  return {
    props: {
      data: 'this page is under SSR',
    },
  };
}

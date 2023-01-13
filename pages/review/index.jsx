// this "index" file under "review" folder MUST be created for navigating to "/review" route | otherwise a 404 page is returned

import { useEffect, useState } from 'react';

export default function Review({ data }) {
  console.log('review page react code render');

  // all the jsx react code will only be run on the client-side under SSR
  useEffect(() => {
    console.log('review page useEffect callback runs');
  }, []);

  const [counter, setCounter] = useState(0);

  return (
    <div className="style-div">
      <p>review main page | {data}</p>
      <p>{counter}</p>
      <hr />
      <button
        onClick={() => {
          setCounter((pre) => {
            return pre + 1;
          });
        }}
      >
        add +
      </button>
    </div>
  );
}

// you should really consider "getServerSideProps" is essentially just the "useEffect" but run on ServerSide instead
// Review page undergoes SSR process, the corresponding html file for "Review" page is NOT generated/rendered at build time
// "getServerSideProps" will run FIRST upon EACH NAVIGATION REQUEST sent from frontend's navigation ON SERVER SIDE
// we also tested that with any callback function that is called by framework or pre-built function, you can name parameter whatever you like
export async function getServerSideProps(wtf) {
  console.log(wtf.params); // undefined, this is only to return url dynamic path param
  console.log(wtf.query); // { userId: '12314235234123412', Name: 'Kay' }, this is to return url query string only
  // we now can access userId or JWT data passed in "getServerSideProps" wtf's "query" object
  const { userId } = wtf.query;
  console.log('review page getServerSideProps run');
  return {
    props: {
      data: userId,
    },
  };
}

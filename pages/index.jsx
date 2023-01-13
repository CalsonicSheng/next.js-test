import Link from 'next/link';
import { useEffect, useState } from 'react';

// each page functional component WILL BE DEFAULT EXPORT (not just export) | otherwise it will not be built even

export default function Home() {
  // all the react jsx code of each react page will be used for:
  // 1. pre-rendering each html file (either SG or SSR) by EXECUTING ALL THE REACT JSX CODE with initial states AT SERVER SIDE (as we have TESTED, ONLY "USEEFFECT" CODE IS NOT RUN)
  // 2. send to client-side to EXECUTE ALL LOGICS AGAIN in browser environment and conduct react hydration process and take over further rendering process (very important)
  // essentially, all these jsx code are still meant to be executed in the frontend client-side
  console.log('home page react code run');

  const [counter, setCounter] = useState(() => {
    console.log('home page useState callback runs');
    return 3;
  });
  const [userId, setUserId] = useState('');

  function setCounterHandler() {
    setCounter((pre) => {
      return pre + 1;
    });
  }

  // if auth pass, then we can store it in localstorage or cookie
  useEffect(() => {
    console.log('home useEffect runs');
    localStorage.setItem('userId', '12314235234123412');
    setUserId(localStorage.getItem('userId'));
  }, []);

  // all the react jsx code below will be used to pre-render into a static html page and store in the next.js server at "build time" ONLY ONCE
  // "index.jsx" home page component is going through SG process AS DEFAULT since no "getServerSideProps" is used, so "getStaticProps" is used as default even if we dont explicitly declare (important)
  // a fully rendered html with ALREADY-FETCHED initial-external data is sent to client, client-side will simply build a DOM from it originally (unlike react to further modify original html SPA file)
  // a corresponding js file (compiled from jsx) is also sent to frontend to conduct react "hydration process" (done on the client-side)
  // react hydration is using client-side JavaScript to add application state + interactivity (as eventListeners) to the existing markup and take over rendering the app on the client-side.
  return (
    <div className="style-div">
      <h1>Home page</h1>
      <p>{counter}</p>
      <button onClick={setCounterHandler}>add +</button>
      <hr />
      {/* "Link" is a pre-built functional component from a pacakge already */}
      {/* again, functional component's prop value assignment can be either wrapped under {} if value is not string or without {} if value is string */}
      <Link href={'/about'}>about</Link>
      <hr />
      <Link href="/contact">
        <h4>contact</h4>
      </Link>
      <hr />
      <Link href="/product">product</Link>
      <hr />
      {/* this is a hacky way to pass more data in url query string (such as userId or JWT) into getStaticProps or getServerSideProps by leverage their "context" parameter object */}
      <Link href={`/review?userId=${userId}&Name=Kay`}>review</Link>
    </div>
  );
}

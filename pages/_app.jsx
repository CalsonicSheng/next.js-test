// as we have tested that any global style CAN ONLY BE IMPORTED IN "_APP.JSX"
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <h1>MyApp persist</h1>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

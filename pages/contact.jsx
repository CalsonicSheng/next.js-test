export default function Contact({ data }) {
  console.log('Contact page react code run');

  return (
    <div className="style-div">
      <h1>contact</h1>
      <p>{data}</p>
    </div>
  );
}

// this contact page undergoes SG process since "getStaticProps" is explicitly used/called, the corresponding "Contact" page html is generated at "build time" ONLY ONCE
// "getStaticProps" will run first and incorporating its return object into the "Contact" page functional component as props AT NEXT SERVER-SIDE ENVIRONMENT
export async function getStaticProps() {
  console.log('contact page getStaticProps runs');

  return {
    props: {
      data: 'this page is under SG process',
    },
  };
}

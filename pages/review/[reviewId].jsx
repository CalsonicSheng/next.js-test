import { useRouter } from 'next/router';

// the dynamic url path value is fully handled by the next.js built-in routing system and "useRouter" hook, but you can also access it from "context" parameter from "getServerSideProps"
export default function ReviewIdPage({ reviewId }) {
  const router = useRouter();

  // the dynamic url path variable name must MATCH EXACTLY WITH THE DYNAMIC ROUTE FILE NAME (very important)
  // const { reviewId } = router.query;

  return <div>this is review {reviewId}</div>;
}

// you do not need "getStaticPaths" to PRE-DETERMINE the exact TOTAL DYNAMIC PAGE during "build time" along with each exact dynamic path value FOR DYNAMIC "ReviewId" Page
// this is because "getServerSideProps" is NOT RUN AT BUILD-TIME BUT IS RUN EACH TIME UPON EACH NAVIGATION REQUEST ON ANY OF THE DYNAMIC PAGE and incorporate its return object DYNAMICALLY
// into ReviewIdPage EACH TIME
export async function getServerSideProps(context) {
  console.log('review ID page getServerSideProps runs');
  console.log(context.params); // this will return { reviewId: '1' }, matches with file naming exactly
  const { reviewId } = context.params;
  return {
    props: {
      reviewId,
    },
  };
}

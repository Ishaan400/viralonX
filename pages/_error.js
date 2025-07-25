// pages/_error.js
export default function ErrorPage({ statusCode }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>{statusCode ? `${statusCode} – An error occurred` : 'An unexpected error occurred'}</h1>
      <p>Sorry, we couldn’t process your request right now.</p>
    </div>
  );
}

// For getInitialProps to receive statusCode
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

import { useEffect } from 'react';

const RedirectionPage = () => {
  const code = new URL(document.location.toString()).searchParams.get('code');

  return <div></div>;
};

export default RedirectionPage;

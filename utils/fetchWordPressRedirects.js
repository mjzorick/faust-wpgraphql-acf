const fetchWordPressRedirects = async function() {
  const resp = await fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          redirection {
            redirects {
              type
              origin
              target
              code
            }
          }
        }
      `,
    }),
  });
  const { data } = await resp.json();

  if(!Array.isArray(data.redirection.redirects)) {
      return [];
  }

  let redirects = data.redirection.redirects
    .filter((redirection) => redirection.type === 'url')
    .map((redirection) => ({
        source: redirection.origin,
        destination: redirection.target,
        permanent: redirection.code === 301 ? true : false
    }));

  return redirects;
}

module.exports = fetchWordPressRedirects;
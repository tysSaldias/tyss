exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method: event.httpMethod,
      path: event.path,
      headers: event.headers,
      body: event.body,
    }),
  };
};

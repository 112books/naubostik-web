export default async (request, context) => {
  const user = context.env.SITE_USER;
  const pass = context.env.SITE_PASS;

  if (!user || !pass) {
    return new Response('Auth no configurada: defineix SITE_USER i SITE_PASS.', {
      status: 503,
    });
  }

  const auth = request.headers.get('Authorization');
  const expected = 'Basic ' + btoa(`${user}:${pass}`);

  if (auth === expected) {
    return context.next(request, context);
  }

  return new Response('Cal autenticació.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Nau Bostik staging"' },
  });
};
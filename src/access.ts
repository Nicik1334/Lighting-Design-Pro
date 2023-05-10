export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};

  return {
    access: (foo: { path: string }): boolean => currentUser?.authUrl.has(foo.path) || false,
  };
}

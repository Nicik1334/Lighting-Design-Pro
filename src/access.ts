export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};

  return {
    access: (foo: { path: string }): boolean => {
      // return currentUser?.authUrl.includes(foo.path) || false;
      return true;
    },
  };
}

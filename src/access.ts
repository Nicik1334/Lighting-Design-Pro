export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  // console.log(currentUser);

  return {
    access: (foo: { path: string }): boolean => {
      // return currentUser?.authUrl.includes(foo.path) || false;
      return true;
    },
    // admin: (foo: { path: string }): boolean => {
    //   console.log(foo);
    //   if (currentUser?.authUrl) {
    //     return currentUser?.authUrl.includes(foo.path);
    //   }
    //   return false;
    // },
  };
}

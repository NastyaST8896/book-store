export const IN_APP_ROUTES = {
  home: {
    path: '/',
    pathName: 'home'
    // getPath(id: string) {
    //   return this.path.replace(':id', id);
    // }
  },
  register: {
    path: '/register',
    pathName: 'registerUser'
  },
  login: {
    path: '/login',
    pathName: 'loginUser'
  },
  profile: {
    path: '/profile',
    pathName: 'profileUser'
  },
  checkAuth: {
    path: '/check-auth',
    pathName: 'checkAuthUser'
  },
  changeName: {
    path: '/change-name',
    pathName: 'changeUserName'
  },
  changePassword: {
    path: '/change-password',
    pathName: 'changeUserPassword'
  },
  refreshToken: {
    path: '/refresh',
    pathName: 'refreshTokenUser'
  }

} as const;
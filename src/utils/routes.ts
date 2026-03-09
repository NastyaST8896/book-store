export const IN_APP_ROUTES = {
  home: {
    path: '/',
    pathName: 'home'
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
  getInfo: {
    path: '/user/user-info',
    pathName: 'getUserInfo'
  },
  changeName: {
    path: '/user/change-name',
    pathName: 'changeUserName'
  },
  changePassword: {
    path: '/user/change-password',
    pathName: 'changeUserPassword'
  },
  refreshToken: {
    path: '/refresh',
    pathName: 'refreshTokenUser'
  },
  changeAvatar: {
    path: '/user/change-avatar',
    pathName: 'changeUserAvatar'
  },
  getAvatar: {
    path: '/user/get-avatar',
    pathName: 'getAvatar'
  },
  getBooks: {
    path: '/books',
    pathName: 'books',
  },
  getBook: {
    set path(id: string) {
      this.path = `/book/${id}`;

      return;
    },
    get path() {
      return this.path;
    },
  },
  setBookRating: {
    path: '/books/rating',
    pathName: 'rating',
  }
} as const;
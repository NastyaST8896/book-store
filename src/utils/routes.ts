export const IN_APP_ROUTES = {
  home: {
    path: '/api',
    pathName: 'home'
  },
  register: {
    path: '/api/register',
    pathName: 'registerUser'
  },
  login: {
    path: '/api/login',
    pathName: 'loginUser'
  },
  profile: {
    path: '/api/profile',
    pathName: 'profileUser'
  },
  cart: {
    path: '/api/cart',
    pathName: 'BooksCart'
  },
  checkAuth: {
    path: '/api/check-auth',
    pathName: 'checkAuthUser'
  },
  getInfo: {
    path: '/api/user/user-info',
    pathName: 'getUserInfo'
  },
  changeName: {
    path: '/api/user/change-name',
    pathName: 'changeUserName'
  },
  changePassword: {
    path: '/api/user/change-password',
    pathName: 'changeUserPassword'
  },
  refreshToken: {
    path: '/api/refresh',
    pathName: 'refreshTokenUser'
  },
  changeAvatar: {
    path: '/api/user/change-avatar',
    pathName: 'changeUserAvatar'
  },
  getAvatar: {
    path: '/api/user/get-avatar',
    pathName: 'getAvatar'
  },
  getBooks: {
    path: '/api/books',
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
    path: '/api/books/rating',
    pathName: 'rating',
  },
  addBookInCart: {
    path: '/api/cart/add-book',
    pathName: 'book-in-cart',
  },
  getCartBooks: {
    path: '/api/cart/books',
    pathName: 'cart-books'
  },
  addBookComment: {
    path: '/api/comments/add-comment',
    pathName: 'add-comment'
  },
  getBookComments: {
    path: '/api/comments/get-comments',
    pathName: 'get-comments'
  },
  getBookGenres: {
    path: '/api/books/genres',
    pathName: 'get-genres'
  },
  getBookNotifications: {
    path: '/api/notifications/book-notifications',
    pathName: 'get-book-notifications'
  },
  getBookNotification: {
    path: '/api/notifications/book-notification',
    pathName: 'get-book-notification'
  },
  setNotificationIsRead: {
    path: '/api/notifications/viewed',
    pathName: 'viewed'
  },
  getNotViewedNotification:{
    path: '/api/notifications/not-viewed-notifications',
    pathName: 'get-not-viewed'
  },
  getMaxPrice:{
    path: '/api/books/maxPrice',
    pathName: 'get-maxPrice'
  },

} as const;
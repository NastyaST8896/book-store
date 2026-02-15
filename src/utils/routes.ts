export const IN_APP_ROUTES = {
  home: {
    path: '/',
    getPath(id: string) {
      return this.path.replace(':id', id);
    }
  },
  login: {
    path: '/login',
    pathName: 'login'
  }
} as const;
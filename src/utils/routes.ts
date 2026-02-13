const IN_APP_ROUTES = {
  home: {
    path: '/home/:id',
    getPath(id: string) {
      return this.path.replace(':id', id);
    }
  }
} as const;
export const ApiRoutes = {
  BOOKS: {
    service: "books",
    url: "/",
    method: "GET",
    authenticate: true,
  },
  BOOK_DETAIL: {
    service: "book",
    url: "/",
    method: "GET",
    authenticate: true,
  },
  LOGIN: {
    service: "login",
    url: "/",
    method: "POST",
    authenticate: false,
  },
};

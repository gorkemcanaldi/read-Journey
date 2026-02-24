export const BASE_URL = "https://readjourney.b.goit.study/api";

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
};

export const registerUser = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "register failed");
  }
  return data;
};

export const getCurrentUser = async (token) => {
  const res = await fetch(`${BASE_URL}/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Unautharized");
  }
  return data;
};

export const refreshUserToken = async (refreshToken) => {
  const res = await fetch(`${BASE_URL}/users/current/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Refresh Failed");
  }
  return data;
};

export const getRecommendBooks = async (
  token,
  { title, author, page = 1, limit = 10 } = {},
) => {
  const query = new URLSearchParams();
  if (title) query.append("title", title);
  if (author) query.append("author", author);

  query.append("page", page);
  query.append("limit", limit);

  const res = await fetch(`${BASE_URL}/books/recommend?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch recommended books");
  }
  return data;
};

export const getOwnBooks = async (token) => {
  const res = await fetch(`${BASE_URL}/books/own`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch own books");
  }
  return data;
};

export const addBook = async (token, id) => {
  const res = await fetch(`${BASE_URL}/books/add/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to add book");
  }

  return res.json();
};

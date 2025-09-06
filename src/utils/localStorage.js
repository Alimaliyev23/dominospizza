export const getCurrentUserId = () => localStorage.getItem("currentUserId");

export const setCurrentUserId = (id) =>
  localStorage.setItem("currentUserId", id);

export const removeCurrentUserId = () =>
  localStorage.removeItem("currentUserId");

export const getUserData = (userId) => {
  try {
    const data = localStorage.getItem(`user_${userId}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setUserData = (userId, data) => {
  try {
    localStorage.setItem(`user_${userId}`, JSON.stringify(data));
  } catch {}
};

export const getStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const setStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {}
};

// User-based wishlist functions
export const getWishlist = (userId) => {
  if (userId) {
    return getStorage(`wishlist_${userId}`);
  }
  return getStorage("wishlist"); // fallback for guest users
};

export const setWishlist = (userId, items) => {
  if (userId) {
    setStorage(`wishlist_${userId}`, items);
  } else {
    setStorage("wishlist", items);
  }
};

export const removeWishlist = (userId) => {
  if (userId) {
    removeStorage(`wishlist_${userId}`);
  } else {
    removeStorage("wishlist");
  }
};
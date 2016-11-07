export const setUser = (data) => {
  localStorage.setItem('currentUser', JSON.stringify(data));
}

export const getUser = () => {
  try {
    let serializedUser = localStorage.getItem('currentUser');
    return JSON.parse(serializedUser);
  } catch(e) {
    return null;
  }
}

export const clearUser = () => {
  localStorage.removeItem('currentUser');
}

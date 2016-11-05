export const setUser = (data) => {
  localStorage.setItem('currentUser', JSON.stringify(data))
}

export const getUser = (data) => {
  try {
    let serializedUser = localStorage.getItem('currentUser')
    return JSON.parse(serializedUser);
  } catch(e) {
    return null;
  }
}

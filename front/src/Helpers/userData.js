const getToken = () => {
  try {
    const userData = JSON.parse(localStorage.getItem("chapter"));
    const token = userData ? userData.token : null;
    return token;
  } catch (error) {
    return "";
  }
};

const setCheck = (email, password) => {
  try {
    const obj = { email, password };
    const data = JSON.stringify(obj);
    localStorage.setItem("chapter", data);
    return "";
  } catch (error) {
    return "";
  }
};
const getCheck = () => {
  try {
    const data = JSON.parse(localStorage.getItem("chapter"));
    return data;
  } catch (error) {
    return "";
  }
};
const clearCheck = () => {
  try {
    localStorage.removeItem("chapter");
    return "";
  } catch (error) {
    return "";
  }
};

const setUserData = async (data) => {
  try {
    const userData = JSON.stringify(data);
    localStorage.setItem("chapter", userData);
    return "";
  } catch (error) {
    return "";
  }
};

const getUserData = () => {
  try {
    const data = JSON.parse(localStorage.getItem("chapter"));
    return data ? data : "";
  } catch (error) {
    return "";
  }
};

const isLogin = () => {
  try {
    const data = JSON.parse(localStorage.getItem("chapter"));
    if (data) {
      return true;
    }
    return false;
  } catch (error) {
    return "";
  }
};

const logout = () => {
  try {
    localStorage.removeItem("chapter");
    window.location.href = "/";
    return "";
  } catch (error) {
    return "";
  }
};
// eslint-disable-next-line
export default { getToken };
export {
  getToken,
  setCheck,
  getCheck,
  clearCheck,
  setUserData,
  isLogin,
  logout,
  getUserData,
};

import axios from 'axios';


const AuthService = () => {
  const login = async (username:string, password:string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { username, password });
      if (response.data.authToken) {
        localStorage.setItem('authToken', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // const logout = () => {
  //   console.log("here");
    
  // };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  };

  return {
    login,
    // logout,
    getCurrentUser,
  };
};

export default AuthService;
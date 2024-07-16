import axios from 'axios';


const api = axios.create({
    baseURL: 'https://final-backend-dweh.onrender.com/', 
    withCredentials: true 
  });

const getCSRFToken = () => {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };
  

export const search_steam = async (gameName) => {
  try{
    const csrfToken = await getCSRFToken();
    const response = await api.post('/steam/bruh/', { body: gameName }, {
      headers: {
        'X-CSRFToken': csrfToken,
        "Content-Type": "application/json"
      }
    });
    return(response.data.games);
  }catch{
    return([]);
  }
  
};

export default search_steam;

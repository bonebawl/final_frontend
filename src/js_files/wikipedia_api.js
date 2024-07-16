import axios from 'axios';


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', 
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
  

export const wiki_search = async (article) => {
    const csrfToken = await getCSRFToken();
    const response = await api.post('steam/api/search/', { body: article }, {
      headers: {
        'X-CSRFToken': csrfToken,
        "Content-Type": "application/json"
      }
    });
    return(response.data.body);
};

export default wiki_search;
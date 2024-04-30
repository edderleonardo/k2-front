export const checkLink = async (link) => {
    const url = import.meta.env.VITE_BASE_URL;
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const base64Credentials = btoa(username + ':' + password);
  
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Basic ${base64Credentials}`,
      }
    };
    
    const response = await fetch(`${url}/api/links/${link}`, options)
    const data = await response.json()
    return data;
  };
  
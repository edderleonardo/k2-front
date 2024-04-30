export const getInstitutions = async () => {
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
  
  const response = await fetch(`${url}/api/institutions/?page_size=100`, options)
  const data = await response.json()
  const institutions_data = ['erebor_mx_retail', 'erebor_co_retail', 'erebor_br_retail' ]
  const institutions = data.results.map((institution) => {
    return {
      id: institution.id,
      display_name: institution.display_name,
      name: institution.name,
      country_code: institution.country_code,
      form_fields: institution.form_fields,
      type: institution.type,
    };
  }).filter((inst) => inst.type === 'bank' && institutions_data.includes(inst.name))


  
  return institutions;
};

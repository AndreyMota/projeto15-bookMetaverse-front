import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export default api;

//Pra facilitar a vida, importa api, e usa assim:
//api.get(*rota*), sem precisar passar a url
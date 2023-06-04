// import { create } from 'apisauce';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from "apisauce";

const api = create({
<<<<<<< HEAD
    baseURL: 'https://reportify-backend-a322.onrender.com',
    // baseURL: 'http://localhost:3000',
=======
    // baseURL: 'https://reportify-backend-a322.onrender.com',
    baseURL: 'http://localhost:3001',
>>>>>>> 5bb0e28e658aa18d62f1cb42fecc755beb8b1e2b
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
})

api.addAsyncRequestTransform(request => async() => {
    const token = await localStorage.getItem('@Reportify:token');

    if (token) {
        request.headers['Authorization'] = `Baerer ${token}`;
    }
})

export default api;
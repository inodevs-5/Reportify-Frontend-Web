// import { create } from 'apisauce';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from "apisauce";

const api = create({
    baseURL: 'https://reportify-backend-a322.onrender.com',
    // baseURL: 'http://10.0.2.2:3000',
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
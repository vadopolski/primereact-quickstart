import axios from 'axios';

export const getClientsFromNetwork = () => {
        return axios.get(`http://localhost:8080/clients`)
                .then(res => {
                    const clients = res.data;
                    return clients;
                });
        };

export const getClientsFromFile = () => {
    return axios.get('/data/cars-large.json')
        .then(res => {
            const client = res.data.data;
            return client;
        });
};
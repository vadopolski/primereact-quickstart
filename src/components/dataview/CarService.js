import axios from 'axios';

export class CarService {
    
    getCarsSmall() {
        return axios.get('cars-small.json')
                .then(res => res.data.data);

    }

    getCarsMedium() {
        return axios.get('cars-medium.json')
                .then(res => res.data.data);
    }

    getCarsLarge() {
        return axios.get('/data/cars-large.json')
                .then(res => {
                    const cars = res.data.data;
                    console.log('!!!!!!!!!!Atention');
                    return cars;
                });
    }
}
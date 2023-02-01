const axios = require('axios').default;

export default class ImagesAPI {
    constructor() {
        this.ENDPOINT = `https://pixabay.com/api/`;
        this.inputValue = "";
    }

    getImages(inputValue) {
        return axios(`${this.ENDPOINT}?key=33272979-e2ed5d1fd8a361bfa8249b6ef&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`);
    }
}
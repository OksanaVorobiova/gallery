const axios = require('axios').default;

export default class ImagesAPI {
  constructor() {
    this.ENDPOINT = `https://pixabay.com/api/`;
    this.inputValue = '';
    this.page = 1;
    this.totalHits = 0;
    this.API_KEY = '33272979-e2ed5d1fd8a361bfa8249b6ef';
  }

  async getImages() {
    const fetchImages = await axios.get(
      `${this.ENDPOINT}?key=${this.API_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    this.totalHits = fetchImages.data.totalHits;
    return fetchImages;
  }

  async getPopularImages() {
    const popularImages = await axios.get(
      `${this.ENDPOINT}?key=${this.API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    console.log(popularImages);
    this.totalHits = popularImages.data.totalHits;
    return popularImages;
  }

  get query() {
    return this.inputValue;
  }

  set query(value) {
    return (this.inputValue = value);
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}

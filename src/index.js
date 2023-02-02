import ImagesAPI from './js/api';
import { Notify } from 'notiflix';
import rendering from './js/renderMarkup';

// Links to the DOM-elements

const refs = {
    formEl: document.getElementById('search-form'),
    inputEl: document.querySelector('input[name="searchQuery"]'),
    submitBtn: document.querySelector('button[type="submit"]'),
    galleryEl : document.querySelector('.gallery'),
}

const { formEl, inputEl, submitBtn, galleryEl } = refs;

// new specimen of class for work with pixabay API
const imagesAPI = new ImagesAPI();

formEl.addEventListener('submit', onFormSubmit);


// handles form submit
async function onFormSubmit(e) {
    e.preventDefault();

    const {
        elements: {
            searchQuery
        }
    } = e.currentTarget;

let inputValue = searchQuery.value.trim();

const imagesArray = await getImagesData(inputValue);

isResponseEmpty(imagesArray);
}

// returns array of image objects or error
async function getImagesData(inputValue) {

  try {
    const searchResponse = await imagesAPI.getImages(inputValue);
    const array = await searchResponse.data.hits;
    return array;
  } catch {
    console.log(error.message);
  }

}

// checks if images array is empty; if it is not - makes UI
function isResponseEmpty(data) {
    if (data.length === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
  
    galleryEl.innerHTML = rendering.reduceImagesArrayToMarkup(data);
}


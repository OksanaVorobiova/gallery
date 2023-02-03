import ImagesAPI from './js/api';
import { Notify } from 'notiflix';
import rendering from './js/renderMarkup';
import pagination from './js/loadMoreBtn';

// Links to the DOM-elements

const refs = {
  formEl: document.getElementById('search-form'),
  submitBtn: document.querySelector('button[type="submit"]'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
}

const { formEl, submitBtn, galleryEl, loadMoreBtn } = refs;

// new specimen of class for work with pixabay API
const imagesAPI = new ImagesAPI();

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);


// handles form submit
async function onFormSubmit(e) {
  e.preventDefault();
  clearGallery();
  loadMoreBtn.style.display = 'none';
  imagesAPI.resetPage();

    const {
        elements: {
            searchQuery
        }
    } = e.currentTarget;

 imagesAPI.query = searchQuery.value.trim();

  isResponseEmpty(await getImagesData());
  console.log(imagesAPI.totalHits);
  Notify.success(`Hooray! We found ${ await (await imagesAPI.getImages()).data.totalHits} images.`); 
}

// returns array of image objects or error
async function getImagesData() {

  try {
    const searchResponse = await imagesAPI.getImages();
    const array = await searchResponse.data.hits;
    imagesAPI.incrementPage();
    loadMoreBtn.style.display = 'inline-block';
    
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
  
  //Notify.success(`Hooray! We found ${data.totalHits} images.`); 
  galleryEl.insertAdjacentHTML("beforeend", rendering.reduceImagesArrayToMarkup(data));
  imagesAPI.getImages().then(isAbleToLoadMore).catch(error => console.log(error));
}

async function onLoadMore(e) {
  isResponseEmpty(await getImagesData());
}

function clearGallery() {
  galleryEl.innerHTML = '';
}



function isAbleToLoadMore(fetchResult) {
  setTimeout(() => {
    if (galleryEl.children.length === fetchResult.data.totalHits) {

      loadMoreBtn.style.display = 'none';
      return Notify.warning("We're sorry, but you've reached the end of search results.");
    }
  }, 1000);
  
}
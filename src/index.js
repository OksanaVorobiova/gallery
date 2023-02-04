import ImagesAPI from './js/api';
import { Notify } from 'notiflix';
import rendering from './js/renderMarkup';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Links to the DOM-elements

const refs = {
  formEl: document.getElementById('search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
}

const { formEl, galleryEl, loadMoreBtn } = refs;

// new specimen of class for work with pixabay API and lightbox config
const imagesAPI = new ImagesAPI();
let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    nav: true,
});

// event listeners
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
  
  console.log(searchQuery.value);

  
  imagesAPI.query = searchQuery.value.trim();
  
  if (!imagesAPI.inputValue) {
    Notify.warning('Enter something');
  } else {
    isResponseEmpty(await getImagesData());

    if (imagesAPI.totalHits) {
     Notify.success(`Hooray! We found ${imagesAPI.totalHits} images.`); 
   }
  } 
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
  if (data.length !== 0) {
      
    galleryEl.insertAdjacentHTML("beforeend", rendering.reduceImagesArrayToMarkup(data));

    lightbox.refresh();

    isAbleToLoadMore();

    } else {
    loadMoreBtn.style.display = 'none';
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
   
 
}


// on loadMoreBtn click
async function onLoadMore(e) {
  isResponseEmpty(await getImagesData());
  const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
  scroll(cardHeight);
}


// makes gallery empty on the new query
function clearGallery() {
  galleryEl.innerHTML = '';
}


// checks if there are images remained in response
function isAbleToLoadMore() {
    if (galleryEl.children.length === imagesAPI.totalHits) {

      loadMoreBtn.style.display = 'none';
      setTimeout(() => {
         Notify.warning("We're sorry, but you've reached the end of search results.");
      }, 500);
     
    } 
}

// scrolls document to new images rendered 
function scroll(cardHeight) {
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

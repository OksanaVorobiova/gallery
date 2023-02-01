import ImagesAPI from './js/api';
import { Notify } from 'notiflix';



const refs = {
    formEl: document.getElementById('search-form'),
    inputEl: document.querySelector('input[name="searchQuery"]'),
    submitBtn: document.querySelector('button[type="submit"]'),
    galleryEl : document.querySelector('.gallery'),
}

const { formEl, inputEl, submitBtn, galleryEl } = refs;
const imagesAPI = new ImagesAPI();

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();

    const {
        elements: {
            searchQuery
        }
    } = e.currentTarget;

    let inputValue = searchQuery.value.trim();

    imagesAPI.getImages(inputValue).then(isResponseEmpty);
}

function isResponseEmpty(data) {
    if (data.length === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    galleryEl.innerHTML = makeGalleryMarkup(data);
}

function makeGalleryMarkup(data) {
    return data.map(({ webFormatURL, tags, likes, views, comments, downloads }) => {
        `<div class="photo-card">
  <img src="${webFormatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    }).join("");

}
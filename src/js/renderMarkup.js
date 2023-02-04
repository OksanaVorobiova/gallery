function makeGalleryMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {

  return `<a class="link-for-lightbox" href="${largeImageURL}">
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
</div>
</a>`

}

function reduceImagesArrayToMarkup(data) {
  return data.reduce((markup, image) => makeGalleryMarkup(image) + markup, "");
}

export default { makeGalleryMarkup, reduceImagesArrayToMarkup };
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  infoContainer: document.querySelector('.cat-info'),
  catImg: document.querySelector('.cat-image'),
  breedName: document.querySelector('.breed-name'),
  breedDescription: document.querySelector('.breed-description'),
  breedTemperament: document.querySelector('.breed-temperament'),
};

refs.infoContainer.insertAdjacentHTML(
  'afterbegin',
  `<img class="cat-image" alt="Cat Image">
         <div class="cat-info-style">
          <h1 class="breed-name"></h1>
          <p class="breed-description"></p>
          <p class="breed-temperament"></p>
    </div>`
);

fetchBreeds().then(breeds => {
  if (breeds.length > 0) {
    console.log(breeds);
    const options = breeds.map(breed => {
      const element = document.createElement('option');
      element.value = breed.id;
      element.textContent = breed.name;
      return element;
    });

    refs.breedSelect.append(...options);
  } else {
    console.log('No breeds found');
  }
});

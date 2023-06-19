import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  infoContainer: document.querySelector('.cat-info'),
  catImg: document.querySelector('.cat-image'),
  breedName: document.querySelector('.breed-name'),
  breedDescription: document.querySelector('.breed-description'),
  breedTemperament: document.querySelector('.breed-temperament'),
};

// refs.infoContainer.insertAdjacentHTML(
//   'afterbegin',
//   `<img class="cat-image" alt="Cat Image">
//          <div class="cat-info-style">
//           <h1 class="breed-name"></h1>
//           <p class="breed-description"></p>
//           <p class="breed-temperament"></p>
//     </div>`
// );

fetchBreeds()
  .then(breeds => {
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
  })
  .catch(() => {
    console.log('Oops! Something went wrong! Try reloading the page!');
  })
  .finally(() => {});

refs.breedSelect.addEventListener('change', showSelectedDbreed);

function showSelectedDbreed() {
  const breedSelectedById = refs.breedSelect.value;
  fetchCatByBreed(breedSelectedById)
    .then(element => {
      if (element.length > 0) {
        console.log('work');
        const catInfo = element[0];
        const catBreed = catInfo.breeds[0];

        refs.catImg.src = catInfo.url;
        refs.breedName.textContent = catBreed.name;
        refs.breedDescription.textContent = catBreed.breedDescription;
        refs.breedTemperament.textContent = catBreed.temperament;

        refs.infoContainer.style.display = 'flex';
      } else {
        console.log('No cat found for the given breed ID');
      }
    })
    .catch(() => {
      console.log('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {});
}

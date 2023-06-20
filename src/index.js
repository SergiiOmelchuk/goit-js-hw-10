import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import './sass/index.css';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  infoContainer: document.querySelector('.cat-info'),
  catImg: document.querySelector('.cat-image'),
  breedName: document.querySelector('.breed-name'),
  breedDescription: document.querySelector('.breed-description'),
  breedTemperament: document.querySelector('.breed-temperament'),
  error: document.querySelector('.error'),
};

refs.breedSelect.style.display = 'none';
refs.infoContainer.style.display = 'none';
refs.error.style.display = 'none';

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
      throw new Error('No breeds found');
    }
    new SlimSelect({
      select: '#single',
    });
  })
  .catch(() => {
    Notiflix.Notify.failure(
      'Oops',
      'Something went wrong, try reloading the page',
      'Ok'
    );
    error.style.display = 'block';
  })
  .finally(() => {
    refs.loader.style.display = 'none';
    refs.breedSelect.style.display = 'block';
  });

refs.breedSelect.addEventListener('change', showSelectedDbreed);

function showSelectedDbreed() {
  const breedSelectedById = refs.breedSelect.value;
  refs.infoContainer.style.display = 'none';
  refs.loader.style.display = 'block';
  refs.error.style.display = 'none';
  fetchCatByBreed(breedSelectedById)
    .then(element => {
      if (element.length > 0) {
        const catInfo = element[0];
        const catBreed = catInfo.breeds[0];

        refs.catImg.src = catInfo.url;
        refs.breedName.textContent = catBreed.name;
        refs.breedDescription.textContent = catBreed.description;
        refs.breedTemperament.textContent = catBreed.temperament;

        refs.infoContainer.style.display = 'flex';
      } else {
        throw new Error('No cat found for the given breed ID');
      }
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops',
        'Something went wrong, try reloading the page.',
        'Ok'
      );
      refs.error.style.display = 'block';
    })
    .finally(() => {
      refs.loader.style.display = 'none';
    });
}

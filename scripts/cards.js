import * as cards from "./index.js"

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      owner: {
        name: "Jacques Cousteau",
        about: "Sailor, researcher",
        avatar: "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        _id: "ef5f7423f7f5e22bef4ad607",
        cohort: "local"
      },
      likes: [],
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      owner: {
        name: "Jacques Cousteau",
        about: "Sailor, researcher",
        avatar: "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        _id: "ef5f7423f7f5e22bef4ad607",
        cohort: "local"
      },
      likes: [],
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      owner: {
        name: "Jacques Cousteau",
        about: "Sailor, researcher",
        avatar: "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        _id: "ef5f7423f7f5e22bef4ad607",
        cohort: "local"
      },
      likes: [],
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      owner: {
        name: "Jacques Cousteau",
        about: "Sailor, researcher",
        avatar: "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        _id: "ef5f7423f7f5e22bef4ad607",
        cohort: "local"
      },
      likes: [],
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      owner: {
        name: "Jacques Cousteau",
        about: "Sailor, researcher",
        avatar: "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        _id: "7423f7f5e22bef4ad607",
        cohort: "local"
      },
      likes: [],
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      owner: {
        name: "Jacques Cousteau",
        about: "Sailor, researcher",
        avatar: "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
        _id: "ef5f7423f7f5e22bef4a",
        cohort: "local"
      },
      likes: [],
    }
];



initialCards.forEach((item) => {
  cards.createCard(item.name, item.link, item.owner._id == document.querySelector(".profile").id, item.likes.length);
  cards.showCard();
})


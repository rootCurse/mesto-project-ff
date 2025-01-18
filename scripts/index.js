import { clearValidation, enableValidation } from "./validation.js";
import { getCards, getUserInfo, updateProfile, createCard as postCard, removeCard, updateAvatar } from "./api.js";


// @todo: Темплейт карточки
const card = document.getElementById("card-template").content;

// @todo: DOM узлы
const cardContainer = document.querySelector(".places__list");

const editProfile = document.querySelector(".popup_type_edit");
const editProfileOpen = document.querySelector(".profile__edit-button");
const editProfileClose = editProfile.querySelector(".popup__close");
const editProfileSubmit = editProfile.querySelector(".popup__button");
const newCard = document.querySelector(".popup_type_new-card");
const newCardOpen = document.querySelector(".profile__add-button");
const newCardClose = newCard.querySelector(".popup__close");
const newCardSubmit = newCard.querySelector(".popup__button");
const changeAvatar = document.querySelector(".popup_type_image");
const changeAvatarOpen = document.querySelector(".avatar__edit-button");
const changeAvatarClose = changeAvatar.querySelector(".popup__close");
const changeAvatarSubmit = changeAvatar.querySelector(".popup__button");

const profile = document.querySelector(".profile");



// @todo: Функция удаления карточки
const deleteCard = (e) => {
    const currentCard = e.currentTarget.parentNode;
    removeCard(currentCard.id);
    currentCard.remove();
}
// @todo: Функция создания карточки
export const createCard = (title, url, isMine, id, likes = 0) => {
    card.querySelector(".card__title").textContent = title;
    card.querySelector(".card__image").src = url;
    const deleteButton = card.querySelector(".card__delete-button");
    card.querySelector(".card__delete-button").style.display = isMine? "block" : "none";
    deleteButton.addEventListener('click', (e) => {deleteCard(e)});
    if(likes){
        card.querySelector('.card__like-count').textContent = likes;
    }
}



// @todo: Вывести карточки на страницу
export const showCard = () => {
    const newCard = card.cloneNode(true)
    newCard.querySelector(".card__delete-button").addEventListener('click', (e) => {deleteCard(e)})
    cardContainer.append(newCard);
    
    
}


const textReg = /^[a-zA-Zа-яА-ЯёЁ\-\s]$/
const closePopup = (formElement) => {
    formElement.style.display = "none";
    clearValidation(formElement.querySelector(".popup__form"), { 
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error', 
        errorClass: ".popup__error_visible"})
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__error_visible'
}); 

const setProfileInfo = (name, about, url = '') => {
    if(!url == '')
        profile.querySelector(".profile__image").style=`background-image: url(${url});`
    profile.querySelector(".profile__title").textContent = name;
    profile.querySelector(".profile__description").textContent = about;
}

editProfileOpen.addEventListener("click", () => {
    editProfile.style.display = "flex";
})
editProfileClose.addEventListener("click", () => {closePopup(editProfile)});
editProfileSubmit.addEventListener("click", async (evt) => {
    evt.preventDefault();
    editProfileSubmit.textContent = 'Сохранение...'
    const name = editProfile.querySelector('.popup__input_type_name').value;
    const about = editProfile.querySelector('.popup__input_type_description').value;
    await updateProfile({
        name: name,
        about: about
    })
    setProfileInfo(name, about);
    editProfileSubmit.textContent = 'Сохранить'
    closePopup(newCard)
})


newCardOpen.addEventListener("click", () => {
    newCard.style.display = "flex";
})
newCardClose.addEventListener("click", () => {closePopup(newCard)});
newCardSubmit.addEventListener("click", async (evt) => {
    evt.preventDefault();
    newCardSubmit.textContent = 'Сохранение...'
    const name = newCard.querySelector('.popup__input_type_card-name').value;
    const link = newCard.querySelector('.popup__input_type_url').value;
    await postCard({
        name: name,
        link: link
    })
    createCard(name, link, true);
    showCard()
    newCardSubmit.textContent = 'Сохранить'
    closePopup(newCard)
})

changeAvatarOpen.addEventListener("click", () => {
    changeAvatar.style.display = "flex";
})
changeAvatarClose.addEventListener("click", () => {closePopup(changeAvatar)});
changeAvatarSubmit.addEventListener("click", async (evt) => {
    evt.preventDefault();
    changeAvatarSubmit.textContent = 'Сохранение...'
    const link = changeAvatar.querySelector('.popup__input_type_url').value;
    document.querySelector(".profile__image").style.backgroundImage = `url("${link}")`
    await updateAvatar({
        avatar: link
    })
    changeAvatarSubmit.textContent = 'Сохранить'
    closePopup(changeAvatar)
})

let data = await getUserInfo();
setProfileInfo(data.name, data.about, data.avatar);
profile.id = data._id;

data = await getCards();
data.forEach(card => {
    createCard(card.name, card.link, card.owner._id == profile.id, card.likes.length());
    cardContainer.append(card.cloneNode(true));
});

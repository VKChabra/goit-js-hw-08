import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

function onFormSubmit(e) {
    e.preventDefault();

    const {elements:{ email, message }} = e.target;

    if (email.value === '' || message.value === '') {
        return alert('Please fill all fields');
    }

    const inputData = {
        email: email.value,
        message: message.value,
    };
    console.log(inputData);

    refs.form.reset()
    localStorage.removeItem(STORAGE_KEY);
}

const userData = {};

function getUserData() {
    userData['email'] = refs.input.value;
    userData['message'] = refs.textarea.value;

    saveDataLocal();
}

function saveDataLocal() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function loadStorage() {
    const savedDataText = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedDataText);
  
    if (parsedData) {
      refs.input.value = parsedData.email;
      refs.textarea.value = parsedData.message;
    }
}

refs.form.addEventListener('submit', onFormSubmit)
refs.input.addEventListener('input', throttle(getUserData, 500));
refs.textarea.addEventListener('input', throttle(getUserData, 500));

loadStorage()
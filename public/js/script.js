console.log('Client side js file')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


// forecast info in the client side js
// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.forecast);
//             console.log(data.location)
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msgOne');
const messageTwo = document.querySelector('#msgTwo')

//setting value from js to html
// messageOne.textContent = 'From client side js'

// to get the location from the form and show the weather of that location

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast;
            }
        })
    })
})
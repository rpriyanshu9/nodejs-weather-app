// Client side javascript

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('#location')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                return
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})
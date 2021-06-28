// Client side javascript

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('#location')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')

const addImage = (source) => {
    var img = document.createElement('img')
    img.src = source
    img.setAttribute('id', 'weather-icon')
    var parentDiv = document.getElementById('weather-img')
    parentDiv.appendChild(img)
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    var image = document.querySelector('#weather-icon')
    if (image) image.remove()
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                return
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            addImage(data.image_src)
        })
    })
})
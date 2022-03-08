let socket = io() // Obtenemos la clase io gracias al script que hemos definido

// Referenciamos los elementos del DOM 
const form = document.querySelector('form')
const input = document.querySelector('input')
let mensajes = document.querySelector('ul') // Referenciamos nuestra lista

// Al tener referenciado nuestro input, podemos ir capturando todos los mensajes
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(input.value){
    socket.emit('nuestrochat', input.value)
    input.value = '' // Después de escribir algo y enviarlo, lo limpiamos
    }
})
// Capturamos los mensajes, y por cada uno creamos un elemento li de la lista. 
socket.on('nuestrochat', (mensaje)=>{
    let elemento = document.createElement('li')
    elemento.textContent = mensaje
    mensajes.appendChild(elemento)
    window.scrollTo(0, document.body.scrollHeight) // Definimos el scroll
})
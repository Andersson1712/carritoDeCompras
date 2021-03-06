export default class UiView{
    message(message){
        const container = document.getElementById('messageContainer')
        const contenedor = document.createElement('div')
        contenedor.classList.add('message')
        const texto = document.createElement('p').textContent = message
        contenedor.appendChild(texto) 
        container.appendChild(contenedor)
    }
}
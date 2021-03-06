import carritoModel from '../models/Carrito.js'
import Ui from '../models/Ui.js'
import Producto from '../models/Producto.js'
const modelCarrito = new carritoModel()
const UI = new Ui()
const producto = new Producto()


export default class UiCarrito{
    carrito = []
    setAgregarProductoCarrito(e){
            let cardProducto = e.target.parentElement.parentElement
            let productoCarrito = {
                id: cardProducto.children[2].childNodes[3].dataset.id ,
                imagen: cardProducto.parentElement.children[0].childNodes[1].currentSrc,
                titulo: cardProducto.children[0].innerText,
                precio: cardProducto.children[1].childNodes[1].innerText,
                cantidad: 1
            }   
            this.carrito.unshift(productoCarrito)
            modelCarrito.setAgregarProductosCarrito(this.carrito)
            
    }

    setAumentarCantidad(id){
        if (this.carrito.indexOf(id)) {
            Object.values(this.carrito).forEach( valor => {
                if (valor.id == id) {
                    if (valor.cantidad < 5) {
                        let newCantidad = modelCarrito.setAumentarCantidad(valor.cantidad)
                        valor.cantidad = newCantidad
                        modelCarrito.setAgregarProductosCarrito(this.carrito)
                    }
                }
              })
             
           }
    }
    setRestarCantidad(id){
        if (this.carrito.indexOf(id)) {
            Object.values(this.carrito).forEach( (valor,index) => {
                if (valor.id == id) {

                    if (valor.cantidad > 1 ) {
                        let newCantidad = modelCarrito.setRestarCantidad(valor.cantidad)
                        valor.cantidad = newCantidad
                        modelCarrito.setAgregarProductosCarrito(this.carrito)
                    }else{

                        this.carrito.splice(index,1)                    
                        modelCarrito.setAgregarProductosCarrito(this.carrito)
                        alert('producto eliminado del carrito')
                    }
                }   
            })
             
        }
    }

    setEliminarProductoCarrito(id){  
        if (this.carrito.indexOf(id)) {
            Object.values(this.carrito).forEach( (valor,index) => {
                if (valor.id == id) 
                  this.carrito.splice(index,1)                    
                  modelCarrito.setAgregarProductosCarrito(this.carrito)
                  alert('producto eliminado del carrito')   
            })
             
        }
    }

    getPintarCarrito(){
        if(modelCarrito.validarLocalStorage()){
            this.carrito = modelCarrito.getObtenerProductosCarrito()
        }
        const productoCarrito = document.getElementById('productCar')
        const templateCarrito = document.getElementById('templateCarrito').content
        const fragmen = document.createDocumentFragment()
        productoCarrito.innerHTML= ''
        Object.values(this.carrito).forEach(item => {
        const clone = templateCarrito.cloneNode(true)
        clone.querySelector('img').src = item.imagen
        clone.querySelector('h4').textContent = item.titulo
        const precio = item.precio * item.cantidad
        clone.getElementById('precio').textContent = precio
        clone.getElementById('cantidad').textContent = item.cantidad
        clone.querySelector('.mas').dataset.id = item.id
        clone.querySelector('.menos').dataset.id = item.id
        fragmen.appendChild(clone)
    })
    productoCarrito.appendChild(fragmen)
    }

    getSubtotalPrecioProductos(){
        const subtotalFooterCarrito = document.getElementById('subtotalFooterCarrito')
        const subtotal = modelCarrito.getSubtotalPrecioProductos(this.carrito)
        subtotalFooterCarrito.textContent = subtotal
    }

    getIvaPrecioProductos(){
        const ivaFooterCarrito = document.getElementById('ivaFooterCarrito')
        const iva = modelCarrito.getIvaProductos()
        ivaFooterCarrito.textContent = iva
    }
    getTotalPrecioProductos(){
        const totalFooterCarrito = document.getElementById('totalFooterCarrito')
        const total = modelCarrito.getTotalPrecioProductos()
        totalFooterCarrito.textContent = total
    }

}
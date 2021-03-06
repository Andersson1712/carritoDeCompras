import Producto from '../models/Producto.js'
import Carrito from '../models/Carrito.js'
import UiProducto from '../controllers/ProductoController.js'
import UiCarrito from '../controllers/CarritoController.js'
const uiproducto = new UiProducto()
const uicarrito = new UiCarrito()
const addProductNew = document.getElementById('addProductNew')
const modalCarrito = document.getElementById('carrito')
const botonCarrito = document.getElementById('car')
const pintarCarrito = document.getElementById('pintarCarrito')
const form = document.getElementById('form')
const productoCarrito = document.getElementById('productCar')
const footerCarContainer = document.getElementById('footerCarContainer')
    //carga todo el contenido 
    document.addEventListener('DOMContentLoaded',() => {
        uiproducto.getPintarProductos()
        uicarrito.getPintarCarrito()
        uicarrito.getSubtotalPrecioProductos()
        uicarrito.getIvaPrecioProductos()
        uicarrito.getTotalPrecioProductos()
    })
    //muestra el carrito de compras
    botonCarrito.addEventListener('click', () => {
        productoCarrito.classList.toggle('display')
        footerCarContainer.classList.toggle('display')
        getSubtotalPrecioProductos()
        
    })
    // habilita el formulario para crear articulos
    addProductNew.addEventListener('click',() => {
        formProduct.style.display = 'grid'
    })
    // crea los productos
    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        uiproducto.setCrearProducto()
        uiproducto.getPintarProductos()
    })
    // agrega los productos al carrito de compras
    containerProductos.addEventListener('click', (e) => {
        if(e.target.classList.contains('button')){
            const id = e.target.parentElement.lastElementChild.getAttribute('data-id')
               uiproducto.validarStock(id)
               uicarrito.setAgregarProductoCarrito(e)
               uiproducto.setRestarStock(id)
               uiproducto.getPintarProductos() 
               uicarrito.getPintarCarrito()
               uicarrito.getSubtotalPrecioProductos()
               uicarrito.getIvaPrecioProductos()
               uicarrito.getTotalPrecioProductos() 

            }
    })
        // modifica el stock del carrito a mas 
    productoCarrito.addEventListener('click',(e) => {
        if (e.target.classList.contains('mas')) {
            const id = e.target.parentElement.children[1].getAttribute('data-id')
            uiproducto.validarStock(id)
            uicarrito.setAumentarCantidad(id)
            uicarrito.getPintarCarrito()
            uiproducto.setRestarStock(id)
            uiproducto.getPintarProductos()
            uicarrito.getSubtotalPrecioProductos()
            uicarrito.getIvaPrecioProductos()
            uicarrito.getTotalPrecioProductos()
        
        }
    })
    //modifica el stock del carrito a menos
    productoCarrito.addEventListener('click',(e) => {
        if (e.target.classList.contains('menos')) {
            const id = e.target.parentElement.children[1].getAttribute('data-id')
            uicarrito.setRestarCantidad(id)
            uicarrito.getPintarCarrito()
            uiproducto.setAumentarStock(id)
            uiproducto.getPintarProductos()
            uicarrito.getSubtotalPrecioProductos()
            uicarrito.getIvaPrecioProductos()
            uicarrito.getTotalPrecioProductos()
        
        }
    })
    //Elimina un producto del carrito 
    productoCarrito.addEventListener('click',(e) => {
        if (e.target.classList.contains('btn-delete')) {
            const unidad = parseInt(e.target.parentElement.children[0].innerText)
            const id = e.target.parentElement.children[1].getAttribute('data-id')
            uiproducto.setRestaurarStock(id, unidad)
            uicarrito.setEliminarProductoCarrito(id)
            uicarrito.getPintarCarrito()
            uiproducto.getPintarProductos()
            uicarrito.getSubtotalPrecioProductos()
            uicarrito.getIvaPrecioProductos()
            uicarrito.getTotalPrecioProductos()
        }
    })
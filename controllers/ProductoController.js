import modelProducto from '../models/Producto.js'
import Ui from '../models/Ui.js'
import carrito from '../controllers/CarritoController.js'
 const productoModel = new modelProducto()
 const ui = new Ui()
 export default class UiProducto {
     articulos = []
     setCrearProducto() {
        const form = document.getElementById('form')
        const formProduct = document.getElementById('formProduct')
        const articulo = {
            imagen: form.querySelectorAll('input')[0].value,
            titulo: form.querySelectorAll('input')[1].value,
            precio: form.querySelectorAll('input')[2].value,
            stock: form.querySelectorAll('input')[3].value,
            id:  form.querySelectorAll('input')[1].value
        }
        form.reset()
        formProduct.style.display = 'none'
        this.articulos.unshift(articulo)
        productoModel.setGuardarLocalStorage(this.articulos)
    }
   setRestarStock(id){
       if (this.articulos.indexOf(id)) {
        Object.values(this.articulos).forEach( valor => {
                if (productoModel.validarStock(valor.stock)) {  
                  let stock = parseInt(valor.stock)
                  let newStock = productoModel.setRestarStock(stock)
                  valor.stock = newStock
                  productoModel.setGuardarLocalStorage(this.articulos)
                  
                }
          })
         
       }
   }

   setAumentarStock(id){
    if (this.articulos.indexOf(id)) {
        Object.values(this.articulos).forEach( valor => {
            if (valor.id == id) {
                let newStock = productoModel.setAumentarStock(valor.stock)
                 valor.stock = newStock
                 productoModel.setGuardarLocalStorage(this.articulos) 
            }
        })     
    }    
   }
   setRestaurarStock(id, unidad){  
    if (this.articulos.indexOf(id)) {
        Object.values(this.articulos).forEach( valor => {
            if (valor.id == id) {
                let newStock = productoModel.setRestaurarStock(valor.stock, unidad)
                valor.stock = newStock
               productoModel.setGuardarLocalStorage(this.articulos, unidad) 
            }
        })     
    } 
       
   }

    getPintarProductos(){
        if(productoModel.validarLocalStorage()){
             this.articulos = productoModel.getObtenerLocalStorage()
         }
        const containerProductos = document.getElementById('containerProductos')
        const template = document.getElementById('template').content
        const fragmen = document.createDocumentFragment()
        containerProductos.innerHTML= ''
        Object.values(this.articulos).forEach( valor => {
                const clone = template.cloneNode(true)
                clone.querySelector('img').src = valor.imagen
                clone.querySelector('h3').textContent = valor.titulo
                clone.getElementById('precio').textContent = valor.precio
                clone.getElementById('stock').textContent = valor.stock
                clone.getElementById('agregar').dataset.id = valor.titulo
                fragmen.appendChild(clone)
            })
            containerProductos.appendChild(fragmen)
    }

    validarStock(id){ 
        if (this.articulos.indexOf(id)) {
            Object.values(this.articulos).forEach( valor => {
                if (valor.id == id) {
                    if (productoModel.validarStock(valor.stock) == -1) {   
                        const button = document.getElementById('agregar')
                        alert('Producto sin stock elige otro')
                        button.setAttribute('disabled')= true
                    }
                }
            })     
        }    
    }
       
     validarExistencia(id ){ 
         if (this.articulos.indexOf(id)) {
             Object.values(this.articulos).forEach( valor => {
                 if (valor.id == id) {
                  if (productoModel.validarExistencia(id) == 1) {
                      return true
                  }
                 }
             })     
         }
     }

 }








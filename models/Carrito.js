export default class Carrito{
  
    setAgregarProductosCarrito(producto){
        localStorage.setItem('productos',JSON.stringify(producto));
    }
   
    setAumentarCantidad(cantidad ){ return cantidad +=  1 }

    setRestarCantidad(cantidad){ return cantidad -=  1 }

    getObtenerProductosCarrito(){
        return JSON.parse(localStorage.getItem('productos'))

    }

    getSubtotalPrecioProductos(){ 
        let subtotal = 0
        let productos = this.getObtenerProductosCarrito()
        productos.forEach(titulo => {
        subtotal += parseInt(titulo.precio * titulo.cantidad)       
        })
        return subtotal
    }
    getIvaProductos(){
        let iva = 0
        const subtotal = this.getSubtotalPrecioProductos()
        iva = subtotal * .16
        return iva
    }
    getTotalPrecioProductos(){
        let total = 0
        const subtotal = this.getSubtotalPrecioProductos() 
        const iva = this.getIvaProductos()
        total = subtotal + iva
        return total
    }

    validarLocalStorage(){
        return localStorage.getItem('productos')
    }
}


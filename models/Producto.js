export default class Producto {
    setGuardarLocalStorage(articulo){ 
        localStorage.setItem('articulos',JSON.stringify(articulo));
    }
    setAgregarStock(){ return  this.stock = this.stock + 1 }

    setRestarStock(stock){ return stock -=  1 }







    getObtenerLocalStorage(){ 
        return JSON.parse(localStorage.getItem('articulos'))
    }

    getImagen(){  return this.imagen }

    getTitulo(){  return this.titulo }

    getStock(){ return this.stock}





    validarLocalStorage(){
        return localStorage.getItem('articulos')
    }

}
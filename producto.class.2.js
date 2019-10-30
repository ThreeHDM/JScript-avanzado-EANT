//Una clase es una estructura. Plano en el que dibujamos la infraestructura del objeto. Qué tiene que tener esta creación ficticia que llamo producto.
/*
    Una clase puede estar compuesta por 4 partes:
    -Contructor: 
    
        Método encargado de recibir los datos y asignarlos a propiedades. Para hacerlo usamos la palabra 'this'. Lo que implica es la autorreferencia. Cada vez que dentro de un miembro de una clase se use la palabra this, se refiere a este objeto del que está haciendo uso.

        JS tiene la limitación (al igual que PHP) de tener un único contructor. Otros lenguajes permiten tener varios constructores (esto se llama sobrecarga [Sobrecarga es la capacidad de un lenguaje de programación, que permite nombrar con el mismo identificador diferentes variables u operaciones])

        En cuanto a los parámetros ES6 permite que se definan valores predeterminados a los parámetros
    
    -Métodos de instancia: es lo que el objeto puede hacer

    -Propiedades L/E: de lectura y escritura. (getters & setters). No se debe (y en algunos lenguajes no se puede) cambiar los datos ya definidos en la instanciación. Espacio destinado para ser más estricto con los datos. Debo pensar qué datos quiero que puedan leerse o cambiar. Se las escribe con la inicial en Mayúscula. Las propiedades privadas van en minúscula y las públicas en mayúscula. Debo usar los getters para leer las propiedades. Se los escribe como funciones pero son propiedades y se acceden como tales Ej: otroProducto.Producto = 10 --> asigna un nuevo valor

    Métodos de clase: son las funciones clásicas que conocemos. Estos no necesitan que exista un objeto para ser ejecutado. Son funciones encapsuladas. Debo acceder primero a la clase y luego ejeucutar el método. No pueden ser accedidos en una instancia del objeto


 */

//La convención es en mayuscula y singular
class Producto {
    //Constructor
    constructor(n, s, p, i, d = true){
        //en JS las propiedades se declaran en el constructor siempre // Esto técnicamente son Atributos (en otros lenguajes). 
        //Una técnica para no confundir atributos con propiedades es nombrarlos aquí de forma aleatoria
        this.nombre = n;
        this.stock = s;
        this.precio = p;
        this.imagen = i;
        this.disponible = d;
    }

    //Propiedades L/E
    get Precio(){
        //al usar el método Precio le agrega el IVA con dos decimales
        return  "$" + (this.precio * 1.21).toFixed(2);
    }
    
    //lo utilizo para setear el valor de la propiedad. Puedo validar el value
    set Precio(value){
        if (value != "" && value != null && value!=undefined && !isNaN(value)) {
            this.precio = value
        } else {
            console.error("ERROR: Valor ingrsado No válido")
        }
    }

    set Disponible(value){
        //aqui se validaría el value

        if (value == this.disponible) {
            alert("La disponibilidad ya está en :" + value)
            return // el return frena toda la ejecución de la función
        }

        let estado = value ? "habilitar" : "deshabilitar"

        if(confirm(`¿Desea ${estado} el producto ${this.nombre}`)){
            this.disponible = value;
        }
    }

    //Métodos de Instancia
    Mostrar(selector){
        
        //Creo un elemento <article></article> y comienzo a trabajar con el llamado Virtual DOM
        let ficha = document.createElement("article")
        

            //creo el attr class y le agrego las clases a ficha
            ficha.classList.add("col-lg-4", "col-md-6", "mb-4", "producto")




            ficha.innerHTML = `<div class="card h-100 bg-dark text-light">
                                <a href="#">
                                    <img class="card-img-top" src="${this.imagen}" alt="${this.nombre}">
                                </a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <a href="#">Producto ${this.nombre}</a>
                                    </h4>
                                    <h5>${this.Precio}</h5>
                                    <p class="card-text">Quedan ${this.stock} unidades</p>
                                </div>
                            </div>`

        //Anexo como nuevo hijo a la respectiva ficha
        document.querySelector(selector).appendChild(ficha)

    }

    aplicarDescuento(valor){
        let importe = (this.precio * valor)  / 100

        this.precio-= importe
    }

    //Métodos de Clase (estáticos)
    static parse(json){ 
        //Entra un JSON y devuelvo objetos Producto
        //let datos = JSON.parse(json) // de JSON a Object

        //typeof permite validar el tipo de dato primitivo
        let datos = (typeof json == "string") ? JSON.parse(json) : json 

        //valido si es una instancia de Array
        if (datos instanceof Array) {
            //console.log("Voy a convertir muchos Objetos en Producto")

            //Recorremos el Array de Object para instanciar objetos producto

            //El método map crea un nuevo array, esto nos ahorra crear un array para almacenar los datos. Se ejecutará tantas veces como objetos haya en la colección.
            //si la arrow function tiene un solo parametro los parentesis no son necesarios
            //Si la función tiene una única instrucción podemos quitar las llaves y la palabra return
            //Instanciamos Objeto Producto con los datos de cada Object 
            //Habrá un retorno por cada iteración
            //Retornar el Array nuevo una vez que se hayan instanciado todos los Objetos Producto
            return datos.map( item  => new Producto(item.Nombre, item.Stock, item.Precio, item.Imagen))

        //Valido si es un Object, para retornar uno solo
        } else if (datos instanceof Object) {
            //console.log("Voy a convertir un Objeto en Producto")

            return new Producto(datos.Nombre, datos.Stock, datos.Precio, datos.Imagen)

        } else {
            //console.log("No convierte pues no es ni array ni objeto")
        }

        

        
    }

}
---
Autor: Alberto Sánchez de la Nieta Pérez
Date: Febrero - 2021
---

# Documentación Curriculum Vitae

## Se trata de un proyecto el cual genera un curriculum a partir de un documento JSON  y lo convierte de forma visual mediante tecnologias js, html, css, bootstrap.

A continuación se muestra el codigo html que se establece como esqueleto.

- HTML:

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap-4.6.0-dist/css/bootstrap.min.css" >
    <link rel="stylesheet" href="style.css" >
    <title>Cv Alberto Sánchez de la Nieta Pérez</title>
</head>
<body>
    <div class="container d-flex justify-content-between shadow-lg my-4">
        <aside class="col-4 p-5 my-3 flex-column justify-content-start aside shadow bg-light" id="bloque2">
            <div id="foto" class="text-center mb-5"></div>
            <div id="perfil" class="mb-5"></div>
            <div id="contacto" class="mb-5"></div>
            <div id="otrosDatos" class="mb-5"></div>
        </aside>
        <div class="col-8 p-5 border-" id="bloque1">
            <h1 id="nombre" class="mt-5 mb-3"></h1>
            <h2 id="apellidos" class="mb-5"></h2>
            <div id="formacion" class="mb-5"></div>
            <div id="experiencia" class="mb-5"></div>
            <div id="tecnologias" class="mb-5"></div>
            <div id="entornos" class="mb-5"></div>
            <div id="proyectosAcademicos" class="mb-5"></div>
            <div id="proyectosPersonales" class="mb-5"></div>
            <div id="intereses" class="mb-5"></div>
        </div>
    </div>
    <script src="cv.js"></script>
    <script src="bootstrap-4.6.0-dist/js/jquery-3.5.1.js"></script>
    <script src="bootstrap-4.6.0-dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

```
## Javascript:

El tratamiento de datos del documento JSON se realiza mediante una funcion asincrona (async-await) ***pushData*** capaz de cargar y hacer las llamadas a las funciones especificas que introducen el contenido en el fichero html. El Json se carga mediante la funcion FETCH.

```js
const pushData = async () => {
    try {
        const response = await fetch('cvJson.json');
        const cvJson = await response.json(); 
        //Bloque 2 aside
        addFoto();
        addPerfil(cvJson);
        addContacto(cvJson);
        addOtrosDatos(cvJson);

        //Bloque 1
        addNombreApellidos(cvJson);
        addFormacion(cvJson);
        addExperiencia(cvJson);
        addTecnologias(cvJson);
        addEntornos(cvJson);
        addproyectosAcademicos(cvJson);
        addproyectosPersonales(cvJson);
        addIntereses(cvJson);
    } catch (error) {
        console.log(error);
    }  
};
```

Funcion ***addFoto*** se encarga de cargar la foto de perfil en el documento

```js
const addFoto = () => {
    document.getElementById("foto").innerHTML = `<img class="foto-perfil img-fluid" src="img/cv.jpg">`;
};
```
Función ***addNombreApellidos*** recibe por parametro el objeto JSON y se encarga de cargar el nombre y apellidos en el html

```js
const addNombreApellidos = (cv) => {
    document.getElementById("nombre").innerHTML = cv.Nombre;
    document.getElementById("apellidos").innerHTML = cv.Apellidos;
};
```
Función ***addFormacion*** recibe por parametro el objeto JSON y se encarga de pintar en el html la formacion academica
```js
const addFormacion = (cv) => {
    let formacion = document.createElement('h4');
    let linea = document.createElement('div');
    linea.className = 'border-bottom border-info mb-4';
    //Añade indice para formacion academica
    formacion.innerHTML = Object.keys(cv)[5].toUpperCase();
    document.getElementById("formacion").appendChild(formacion);
    document.getElementById("formacion").appendChild(linea);

    cv['Formación Academica'].forEach(element => {
        let divTitulo = document.createElement('div');
        let pTitulo = document.createElement('p');
        pTitulo.className = 'titulo font-weight-bold mb-0';
        pTitulo.innerHTML = element.Titulo;
        let pDescripcion = document.createElement('p');
        pDescripcion.innerHTML = `${element.Fecha} ${element.Centro} ${element.Ubicacion}`;
        divTitulo.appendChild(pTitulo);
        divTitulo.appendChild(pDescripcion);
        document.getElementById("formacion").appendChild(divTitulo);
    });
};
```
Función ***addExperiencia*** recibe por parametro el objeto JSON y se encarga de
añadir la experiencia profesional al documento.
```js
const addExperiencia = (cv) => {
    let experiencia = document.createElement('h4');
    let linea = document.createElement('div');
    linea.className = 'border-bottom border-info mb-4';
    //Añade indice para experiencia profesional
    experiencia.innerHTML = Object.keys(cv)[6].toUpperCase();
    document.getElementById("experiencia").appendChild(experiencia);
    document.getElementById("experiencia").appendChild(linea);

    cv['Experiencia Profesional'].forEach(element => {
        let divPuesto = document.createElement('div');
        let pTitulo = document.createElement('p');
        pTitulo.className = 'titulo font-weight-bold mb-0';
        pTitulo.innerHTML = element.Puesto;
        let pFecha = document.createElement('p');
        pFecha.innerHTML = element.Fecha;
        divPuesto.appendChild(pTitulo);
        divPuesto.appendChild(pFecha);
        document.getElementById("experiencia").appendChild(divPuesto);
    });
};
```
Función ***addTecnologias*** recibe por parametro el objeto JSON y se encarga de
añadir las tecologias al documento mediante listas, para controlar tecnologias repetidas
hacemos uso del objeto Set.
```js
const addTecnologias = (cv) => {
    let tecnologias = document.createElement('h4');
    let linea = document.createElement('div');
    linea.className = 'border-bottom border-info mb-4';
    //Añade indice para tecnologias
    tecnologias.innerHTML = Object.keys(cv)[7].toUpperCase();
    document.getElementById("tecnologias").appendChild(tecnologias);
    document.getElementById("tecnologias").appendChild(linea);

    //Creo el objeto set para tratar las tecnologias, y si hubiera alguna repetida no incluirla (la ignora)
    const objSet = new Set(cv.Tecnologías);
    //transforma el objeto set en un array
    let arraySet = [...objSet];
    
    //Controla si las tecologias son pares o impares por columna
    let size = (objSet.size/2); 
    if (!Number.isInteger(size)) 
        size = (objSet.size + 1)/2;

    //Añade primera lista con la mitad de las tecnologias    
    let lista1 = document.createElement('ul');
    for (let index = 0; index < size; index++) {
        let li = document.createElement('li');
        li.innerHTML = arraySet[index];
        lista1.appendChild(li);
    }
    //Añade segunda lista de tecnologias
    let lista2 = document.createElement('ul');
    for (let index = size; index < objSet.size; index++) {
        let li = document.createElement('li');
        li.innerHTML = arraySet[index];
        lista2.appendChild(li);
    }
    let div = document.createElement('div');
    div.className = 'd-flex justify-content-around';
    div.appendChild(lista1);
    div.appendChild(lista2);
    document.getElementById("tecnologias").appendChild(div);
};
```
Función ***addEntornos*** recibe por parametro el objeto JSON y se encarga de
añadir las los entornos de trabajo al documento mediante listas, para controlar entornos repetidos
hacemos uso del objeto Set.
```js
const addEntornos = (cv) => {
    let entornos = document.createElement('h4');
    let linea = document.createElement('div');
    linea.className = 'border-bottom border-info mb-4';
    //Añade indice para entornos de trabajo
    entornos.innerHTML = Object.keys(cv)[8].toUpperCase();
    document.getElementById("entornos").appendChild(entornos);
    document.getElementById("entornos").appendChild(linea);
    
    //Creo el objeto set para tratar las tecnologias, y si hubiera alguna repetida no incluirla (la ignora)
    const objSet = new Set(cv['Entornos de trabajo']);
    //transforma el objeto set en un array
    let arraySet = [...objSet];
    
    //Controla si las tecologias son pares o impares por columna
    let size = (objSet.size/2); 
    if (!Number.isInteger(size)) 
        size = (objSet.size + 1)/2;

    //Añade primera lista con la mitad de las tecnologias    
    let lista1 = document.createElement('ul');
    for (let index = 0; index < size; index++) {
        let li = document.createElement('li');
        li.innerHTML = arraySet[index];
        lista1.appendChild(li);
    }
    //Añade segunda lista de tecnologias
    let lista2 = document.createElement('ul');
    for (let index = size; index < objSet.size; index++) {
        let li = document.createElement('li');
        li.innerHTML = arraySet[index];
        lista2.appendChild(li);
    }
    let div = document.createElement('div');
    div.className = 'd-flex justify-content-around';
    div.appendChild(lista1);
    div.appendChild(lista2);
    document.getElementById("entornos").appendChild(div);
};
```
Función ***addproyectosAcademicos*** recibe por parametro el objeto JSON y se encarga de añadir cada uno de los proyectos al documento html
```js
const addproyectosAcademicos = (cv) => {
    let pAcademicos = document.createElement('h4');
    let linea = document.createElement('div');
    linea.className = 'border-bottom border-info mb-4';

    //Añade indice para entornos de trabajo
    pAcademicos.innerHTML = Object.keys(cv)[9].toUpperCase();
    document.getElementById("proyectosAcademicos").appendChild(pAcademicos);
    document.getElementById("proyectosAcademicos").appendChild(linea);

    //añade cada uno de los proyectos al documento
    cv['Proyectos Academicos'].forEach(element => {
        let proyecto = document.createElement('div');
        let titulo = document.createElement('p');
        titulo.className = 'titulo font-weight-bold mb-0';
        titulo.innerHTML = element.Nombre;
        let descripcion = document.createElement('p');
        descripcion.className = 'text-justify';
        descripcion.innerHTML = element.Descripción;
        proyecto.appendChild(titulo);
        proyecto.appendChild(descripcion);
        document.getElementById("proyectosAcademicos").appendChild(proyecto);
    });
};
```
Función ***addproyectosPersonales*** recibe por parametro el objeto JSON y se encarga de añadir cada uno de los proyectos al documento html
```js
const addproyectosPersonales = (cv) => {
    let pPersonales = document.createElement('h4');
    let linea = document.createElement('div');
    linea.className = 'border-bottom border-info mb-4';

    //Añade indice para entornos de trabajo
    pPersonales.innerHTML = Object.keys(cv)[10].toUpperCase();
    document.getElementById("proyectosPersonales").appendChild(pPersonales);
    document.getElementById("proyectosPersonales").appendChild(linea);

    //añade cada uno de los proyectos al documento
    cv['Proyectos Personales'].forEach(element => {
        let proyecto = document.createElement('div');
        let titulo = document.createElement('p');
        titulo.className = 'titulo font-weight-bold mb-0';
        titulo.innerHTML = element.Nombre;
        let descripcion = document.createElement('p');
        descripcion.className = 'text-justify';
        descripcion.innerHTML = element.Descripción;
        proyecto.appendChild(titulo);
        proyecto.appendChild(descripcion);
        document.getElementById("proyectosPersonales").appendChild(proyecto);
    });
};
```
Función ***addIntereses*** recibe por parametro el objeto JSON y se encarga de añadir los intereses personales al documento html
```js
const addIntereses = (cv) => {
    let intereses = document.createElement('h4');
    let linea = document.createElement('div');
    linea.className = 'border-bottom border-info mb-4';

    //Añade indice para intereses personales
    intereses.innerHTML = Object.keys(cv)[11].toUpperCase();
    document.getElementById("intereses").appendChild(intereses);
    document.getElementById("intereses").appendChild(linea);
    
    let contenido = document.createElement('div');
    contenido.className = 'intereses text-justify';
    //remplaza saltos de linea del json por br
    let changed = cv['Intereses Personales'].replace(/\n/g, '<br />');
    contenido.innerHTML = changed;
    document.getElementById("intereses").appendChild(contenido);
};
```
La función ***addPerfil*** se encarga de cargar el texto referente al perfil en el coumento html
```js
const addPerfil = (cv) => {
    //remplaza saltos de linea del jsopn por br
    let changed = cv.Perfil.replace(/\n/g, '<br />');
    let perfil = document.createElement('h4');
    perfil.className = 'text-primary';
    //Añade indice para perfil
    perfil.innerHTML = Object.keys(cv)[2].toUpperCase();
    document.getElementById('perfil').appendChild(perfil);
    let div = document.createElement('div');
    div.className = 'text-justify';
    div.innerHTML = changed;
    document.getElementById('perfil').appendChild(div);
};
```
La función ***addContacto*** se encarga de cargar la informacion referente al contacto mediante una imagen descriptiva y la informacion referente.
```js
const addContacto = (cv) => {
    let contacto = document.createElement('h4');
    contacto.className = 'text-primary';
    //Añade indice para contacto
    contacto.innerHTML = Object.keys(cv)[3].toUpperCase();
    document.getElementById('contacto').appendChild(contacto);

    let telefono = document.createElement('div');
    telefono.className = 'item-contacto';
    
    for (const index in cv.Contacto) {
        let div = document.createElement('div');
        let image = document.createElement('img');
        switch (index) {
            case 'Telefono':
                image.src = 'img/tlf.png';
                break;
            case 'Email':
                image.src = 'img/mail.png';
                break;
            case 'Linkdin': 
                image.src = 'img/lkd.png';
                break;
            case 'GitHub':
                image.src = 'img/git.png';
                break;        
        }
        let dato = document.createElement('p');
        dato.innerHTML = cv.Contacto[index];
        dato.className = 'text-truncate'
        div.appendChild(image);
        div.appendChild(dato);
        document.getElementById('contacto').appendChild(div);
    }
};
```
La función ***addOtrosDatos*** se encarga de cargar la informacion como idiomas, carnet de conducir, disponibilidad...
```js
const addOtrosDatos = (cv) => {
    let otrosDatos = document.createElement('h4');
    otrosDatos.className = 'text-primary';
    //Añade indice para contacto
    otrosDatos.innerHTML = Object.keys(cv)[4].toUpperCase();
    document.getElementById('otrosDatos').appendChild(otrosDatos);

    for (const key in cv['Otros datos']) {
        let div = document.createElement('div');
        let titulo = document.createElement('p');
        titulo.className = 'mb-0';
        titulo.innerHTML = key;
        let propiedad = document.createElement('p');
        propiedad.innerHTML = cv['Otros datos'][key];
        div.appendChild(titulo);
        div.appendChild(propiedad);
        document.getElementById('otrosDatos').appendChild(div);
    }
};
```
Por ultimo la llamada a la funcion asincrona que hace ejecutarse todo el codigo:
***pushData()***:
```js
pushData();
```

//Funcion asincrona que recoge el cv en json y realiza las llamadas 
//a las funciones que cargan en el html la informacion correspondiente
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

//Funcion que añade la foto de perfil al cv
const addFoto = () => {
    document.getElementById("foto").innerHTML = `<img class="foto-perfil img-fluid" src="img/cv.jpg">`;
};

//Funcion que añade el nombre y los apellidos al documento
const addNombreApellidos = (cv) => {
    document.getElementById("nombre").innerHTML = cv.Nombre;
    document.getElementById("apellidos").innerHTML = cv.Apellidos;
};

//funcion que Añade la formacion academica
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

//funcion que añade la experiencia profesional al documento 
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

//Funcion que añade al documento las tecnologias
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

//funcion que añade al documento los entornes de trabajo
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

//Funcion que carga los proyectos academicos en el documento
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

//Funcion que carga los proyectos personales en el documento
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

//Funcion que añade al documento los intereses personales
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

//funcion que añade perfil al documento 
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

//Funcion que añade la informacion de contacto
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
        let enlace = document.createElement('a');
        let dato = document.createElement('p');

        switch (index) {
            case 'Telefono':
                image.src = 'img/tlf.png';
                dato.innerHTML = cv.Contacto[index];
                break;
            case 'Email':
                image.src = 'img/mail.png';
                dato.innerHTML = cv.Contacto[index];
                break;
            case 'Linkdin': 
                image.src = 'img/lkd.png';
                enlace.innerHTML = cv.Contacto[index];
                enlace.href = cv.Contacto[index];
                dato.appendChild(enlace);
                break;
            case 'GitHub':
                image.src = 'img/git.png';
                enlace.innerHTML = cv.Contacto[index];
                enlace.href = cv.Contacto[index];
                dato.appendChild(enlace);
                break;  
            case 'Web':
                image.src = 'img/web1.png';
                enlace.innerHTML = cv.Contacto[index];
                enlace.href = cv.Contacto[index];
                dato.appendChild(enlace);
                break;      
        } 
        dato.className = 'text-truncate';
        div.className = 'icono-contacto';
        div.appendChild(image);
        div.appendChild(dato);
        document.getElementById('contacto').appendChild(div);
    }
};

//Funcion que ñade "otros datos"
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

pushData();
//por ahora se usaran valores fijos
//import { nivel } from "../const/nivelEdificio";

const cantidadNiveles = 5;

const crearNiveles = () => {
    const edificioContainer = document.getElementById('EdificioContainer');

    for (let i = 0; i < cantidadNiveles; i++) {
        edificioContainer.appendChild(nivel());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    crearNiveles();
})
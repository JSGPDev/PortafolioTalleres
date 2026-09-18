//por ahora se usaran valores fijos
//import { nivel } from "../const/nivelEdificio";

const cantidadNiveles = 5;

const crearNiveles = () => {
    const construccionContainer = document.getElementById('ConstruccionContainer');

    for (let i = 0; i < cantidadNiveles; i++) {
        construccionContainer.appendChild(nivel());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    crearNiveles();
})
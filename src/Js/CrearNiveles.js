import { nivel } from "../const/nivel.js";
import copa from "../const/copa.js";

const crearNiveles = (datos) => {
    const cantidad = datos.length
    console.log(`se crearan ${cantidad} niveles`)

    const construccionContainer = document.getElementById('ConstruccionContainer');

    const raiz = nivel();
    raiz.classList.add("Raiz");
    construccionContainer.appendChild(raiz);

    for (let i = 0; i < cantidad; i++) {
        const archivoImagen = datos[i].Archivo
        if (archivoImagen === null) archivoImagen = '../Infografias/Webp/SinContenidoDisponible.webp'
        construccionContainer.appendChild(nivel(archivoImagen, i + 1));
    }

    construccionContainer.appendChild(copa())
}

export default crearNiveles;
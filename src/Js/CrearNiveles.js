import nivel from "../const/nivel.js";
import copa from "../const/copa.js";

const crearNiveles = (datos) => {
    const cantidad = datos.length
    console.log(`se crearan ${cantidad} niveles`)
    if (cantidad <= 0) { console.log(`cantidad a contruir es cero`); return; }

    const construccionContainer = document.getElementById('ConstruccionContainer');

    construccionContainer.appendChild(nivel())

    for (let i = 0; i < cantidad; i++) {
        const archivoImagen = datos[i].Archivo
        console.log(archivoImagen)
        if (archivoImagen === null) archivoImagen = '../Infografias/Webp/SinContenidoDisponible.webp'
        construccionContainer.appendChild(nivel(archivoImagen));
    }

    construccionContainer.appendChild(copa())
}

export default crearNiveles;
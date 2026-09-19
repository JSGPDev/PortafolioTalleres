//por ahora se usaran valores fijos
//import { nivel } from "../const/nivelEdificio";

const cantidadNiveles = 5;

const cargarManifest = async () => {
    try {
        const respuesta = await fetch('../../manifest.json');

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        console.log(respuesta);
        console.log(datos.infografias);
        return datos.infografias;
    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
    }
}

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
}



document.addEventListener('DOMContentLoaded', async () => {
    const DatosInfografias = await cargarManifest();

    if (DatosInfografias !== null)
        crearNiveles(DatosInfografias)

})
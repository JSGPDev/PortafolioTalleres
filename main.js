import buscarInfografias from "./src/Js/Infografias.js";
import crearNiveles from "./src/Js/crearNiveles.js";
import { moverEscenario } from "./src/Js/moverEscenario.js";
import { escuchar, establecerNivelHash } from "./src/Js/controles.js";

const verHash = () => {
    const coincidencia = window.location.hash.match(/^#infografia-(\d+)$/);

    const nivel = !coincidencia ? 0 : Number(coincidencia[1]);

    establecerNivelHash(nivel);

    moverEscenario(nivel);
}

document.addEventListener('DOMContentLoaded', async () => {
    const DatosInfografias = await buscarInfografias();

    if (DatosInfografias !== null)
        crearNiveles(DatosInfografias)

    escuchar();

    verHash();
});

window.addEventListener("hashchange", () => {
    verHash();
});
import buscarInfografias from "./src/Js/Infografias.js";
import crearNiveles from "./src/Js/crearNiveles.js";
import moverEscenario from "./src/Js/moverEscenario.js";
import escuchar from "./src/Js/controles.js";

document.addEventListener('DOMContentLoaded', async () => {
    const DatosInfografias = await buscarInfografias();

    if (DatosInfografias !== null)
        crearNiveles(DatosInfografias)

    escuchar();
})

window.addEventListener("hashchange", () => {
    const coincidencia = window.location.hash.match(/^#infografia-(\d+)$/);

    if (!coincidencia) return;

    moverEscenario(Number(coincidencia[1]));
});
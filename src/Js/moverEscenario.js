import controlInfografia from "./ManejadorInfografias.js";
let nivelActual = 0;

const moverEscenario = (nivelObjetivo) => {
    const niveles = document.getElementsByClassName("Nivel");
    const escenario = document.getElementById("Escenario");
    const construccionContainer = document.getElementById("ConstruccionContainer");
    const ardilla = document.getElementById("Ardilla");

    if (!niveles || !escenario || !construccionContainer || !ardilla) return;

    nivelObjetivo = Math.min(
        Math.max(nivelObjetivo, 0),
        niveles.length - 1
    );

    if (nivelObjetivo === nivelActual) return;

    controlInfografia.ver(false);

    const alturaNivel = niveles[0].getBoundingClientRect().height;
    const desplazamiento = alturaNivel * nivelObjetivo;

    const tiempoEntrada = nivelActual !== 0 ? 0 : 0.5;
    const tiempoSalida = 0.5;
    const tiempoSubida = Math.abs(
        0.5 * (nivelActual - nivelObjetivo)
    );

    ardilla.style.transitionDuration = `${tiempoEntrada}s`;

    ardilla.classList.remove("ArdillaSuelo");
    ardilla.classList.add("ArdillaNivel");

    setTimeout(() => {
        escenario.style.transitionDuration = `${tiempoSubida}s`;

        escenario.style.transform =
            `translateY(${desplazamiento}px)`;

        ardilla.classList.add("MoviendoArdilla")

        ardilla.style.transitionDuration = `${tiempoSubida}s`;

        ardilla.style.transform =
            `translateX(${(-desplazamiento - alturaNivel * 0.5) * -1}px) `;

        construccionContainer.className = "Moviendo";

        setTimeout(() => {

            construccionContainer.className = "Quieto";
            ardilla.classList.remove("MoviendoArdilla")

            if (nivelObjetivo === 0) {
                ardilla.style.transitionDuration = `${tiempoSalida}s`;

                ardilla.style.transform = "translateX(0)";

                ardilla.classList.remove("ArdillaNivel");
                ardilla.classList.add("ArdillaSuelo");
            }

            nivelActual = nivelObjetivo;
            if (nivelActual !== 0) controlInfografia.expandirInfografia(nivelActual);
        }, tiempoSubida * 1000);
    }, tiempoEntrada * 1000);
};

export { moverEscenario, nivelActual };
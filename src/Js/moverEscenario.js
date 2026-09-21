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

    const alturaNivel = niveles[0].getBoundingClientRect().height;
    const desplazamiento = alturaNivel * nivelObjetivo;

    const tiempoEntrada = 0.5;
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

        ardilla.style.transitionDuration = `${tiempoSubida}s`;

        ardilla.style.transform =
            `translateY(${-desplazamiento - alturaNivel * 0.5}px)`;

        construccionContainer.className = "Moviendo";

        setTimeout(() => {

            construccionContainer.className = "Quieto";

            if (nivelObjetivo === 0) {
                ardilla.style.transitionDuration = `${tiempoEntrada}s`;

                ardilla.style.transform = "translateY(0)";

                ardilla.classList.remove("ArdillaNivel");
                ardilla.classList.add("ArdillaSuelo");
            }
            nivelActual = nivelObjetivo;
        }, tiempoSubida * 1000);
    }, tiempoEntrada * 1000);
};

export default moverEscenario;
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

    // --------------------------------
    // 1. La ardilla entra al árbol
    // --------------------------------

    ardilla.style.transitionDuration = `${tiempoEntrada}s`;

    ardilla.classList.remove("ArdillaSuelo");
    ardilla.classList.add("ArdillaNivel");


    // --------------------------------
    // 2. Esperamos a que llegue al árbol
    // --------------------------------

    setTimeout(() => {

        // Movimiento del escenario
        escenario.style.transitionDuration = `${tiempoSubida}s`;

        escenario.style.transform =
            `translateY(${desplazamiento}px)`;


        // Movimiento de la ardilla
        ardilla.style.transitionDuration = `${tiempoSubida}s`;

        ardilla.style.transform =
            `translateY(${-desplazamiento - alturaNivel * 0.5}px)`;


        // Focus del árbol
        construccionContainer.className = "Moviendo";


        setTimeout(() => {

            construccionContainer.className = "Quieto";

            // Si volvemos al nivel 0
            if (nivelObjetivo === 0) {
                ardilla.style.transitionDuration = `${tiempoEntrada}s`;

                // Eliminar el desplazamiento acumulado
                ardilla.style.transform = "translateY(0)";

                // Sacar la ardilla del árbol
                ardilla.classList.remove("ArdillaNivel");
                ardilla.classList.add("ArdillaSuelo");
            }

            nivelActual = nivelObjetivo;

        }, tiempoSubida * 1000);

    }, tiempoEntrada * 1000);
};
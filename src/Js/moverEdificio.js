
const moverEdificio = (cantidadNiveles) => {
    const piso = document.querySelector(".EdificioNivel");
    const escenario = document.getElementById("Escenario");

    if (!piso || !escenario) return;

    const alturaPiso = piso.getBoundingClientRect().height;

    const desplazamiento = alturaPiso * cantidadNiveles;

    escenario.style.transform = `translateY(${desplazamiento}px)`;
};
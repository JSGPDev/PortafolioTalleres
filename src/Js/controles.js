
const siguienteNivel = document.getElementById("SiguienteNivel");
const anteriorNivel = document.getElementById("AnteriorNivel");
const seleccionarNivel = document.getElementById("SeleccionNivel");

const establecerNivelHash = (nivel) => {
    nivel = limitarACantidad(nivel);
    seleccionarNivel.value = nivel;

    if (nivel === 0) {
        window.location.hash = "";
        return;
    }

    window.location.hash = `infografia-${nivel}`;
}

const limitarACantidad = (numero) => {
    const cantidadNiveles = document.getElementsByClassName("Nivel").length;

    return Math.min(
        Math.max(numero, 0),
        cantidadNiveles - 1
    );
}

const cambiarNivel = (factor) => {
    factor = Math.min(Math.max(factor, -1), 1);

    const coincidencia = window.location.hash.match(/^#infografia-(\d+)$/);

    establecerNivelHash((coincidencia ? Number(coincidencia[1]) : 0) + factor);
}

const escuchar = () => {

    siguienteNivel.addEventListener('click', () => cambiarNivel(1));
    anteriorNivel.addEventListener('click', () => cambiarNivel(-1));

    seleccionarNivel.addEventListener('change', (e) => {
        const value = Number(seleccionarNivel.value);

        establecerNivelHash(value);
    })
}

export { escuchar, establecerNivelHash };
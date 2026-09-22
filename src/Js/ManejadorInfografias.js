import { cargarPdf } from "../const/nivel.js";

const ver = (visible) => {
    const visor = document.getElementById("VisorInfografia");
    visor.className = visible ? "" : "Oculto";
}

const expandirInfografia = async (infografiaId) => {
    const infografia = document.getElementById(
        `Infografia-${infografiaId}`
    );

    const infografiaContainer = document.getElementById(
        "InfografiaContainer"
    );

    const descargar = document.getElementById(
        "DescargarInfografia"
    );

    infografiaContainer.replaceChildren();

    if (infografia.dataset.tipo === "pdf") {
        await cargarPdf(
            infografia.dataset.archivo,
            infografiaContainer,
            infografia.dataset.id
        );
    } else {
        infografiaContainer.appendChild(
            infografia.cloneNode(true)
        );
    }

    descargar.href = infografia.dataset.archivoSrc;

    const archivo = infografia.dataset.archivo.split("/").pop();

    descargar.download = archivo;

    ver(true);
};

const controlInfografia = {
    ver,
    expandirInfografia
}

export default controlInfografia;
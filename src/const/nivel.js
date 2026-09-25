import pdfjsLib from "../Js/pdf.js";

const cargarArchivoAlternativo = (contenedor, id) => {
    const img = document.createElement("img");

    img.src = "src/Infografias/Webp/SinContenidoDisponible.webp";
    img.classList.add("InfografiaWebp");

    img.id = `Infografia-${id}`;

    img.dataset.tipo = "webp";
    img.dataset.archivo = "SinContenidoDisponible.webp";
    img.dataset.id = id;
    img.dataset.archivoSrc =
        "./src/Infografias/Webp/SinContenidoDisponible.webp";

    contenedor.appendChild(img);
};

const cargarPdf = async (archivo, contenedor, id) => {
    const rutaPdf = "src/Infografias/Pdf/" + archivo;

    let pdf;

    try {
        pdf = await pdfjsLib.getDocument(rutaPdf).promise;
    } catch (error) {
        console.error(`No se pudo cargar el PDF "${archivo}":`, error);

        cargarArchivoAlternativo(contenedor, id);

        return;
    }

    let paginaActual = 1;

    const contenedorPdf = document.createElement("div");
    contenedorPdf.id = `Infografia-${id}`;
    contenedorPdf.dataset.archivoSrc =
        "./src/Infografias/Pdf/" + archivo;
    contenedorPdf.classList.add("ContenedorPdf");
    contenedorPdf.dataset.tipo = "pdf";
    contenedorPdf.dataset.archivo = archivo;
    contenedorPdf.dataset.id = id;

    const canvas = document.createElement("canvas");
    canvas.classList.add("InfografiaPdf");

    const renderizarPagina = async () => {
        try {
            const pagina = await pdf.getPage(paginaActual);

            const viewport = pagina.getViewport({
                scale: 1
            });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await pagina.render({
                canvasContext: canvas.getContext("2d"),
                viewport
            }).promise;

        } catch (error) {
            console.error(
                `No se pudo renderizar la página ${paginaActual} del PDF "${archivo}":`,
                error
            );
        }
    };

    contenedorPdf.appendChild(canvas);

    if (pdf.numPages > 1) {
        const controles = document.createElement("div");
        controles.classList.add("ControlesPdf");

        const flechaDer = document.createElement("div");
        const flechaIzq = document.createElement("div");

        flechaDer.className = "Flecha Derecha";
        flechaIzq.className = "Flecha Izquierda";

        const anterior = document.createElement("button");
        anterior.appendChild(flechaIzq);

        const indicador = document.createElement("span");
        indicador.textContent = `1 / ${pdf.numPages}`;

        const siguiente = document.createElement("button");
        siguiente.appendChild(flechaDer);

        anterior.addEventListener("click", async () => {
            if (paginaActual <= 1) return;

            paginaActual--;

            indicador.textContent =
                `${paginaActual} / ${pdf.numPages}`;

            await renderizarPagina();
        });

        siguiente.addEventListener("click", async () => {
            if (paginaActual >= pdf.numPages) return;

            paginaActual++;

            indicador.textContent =
                `${paginaActual} / ${pdf.numPages}`;

            await renderizarPagina();
        });

        controles.appendChild(anterior);
        controles.appendChild(indicador);
        controles.appendChild(siguiente);

        contenedorPdf.appendChild(controles);
    }

    contenedor.appendChild(contenedorPdf);

    await renderizarPagina();
};

const nivel = (archivo = null, idNivel) => {
    const nuevoNivel = document.createElement("div");

    nuevoNivel.classList.add("Nivel");

    if (archivo !== null) {
        const extension = archivo.split(".").pop().toLowerCase();

        switch (extension) {
            case "webp": {
                const img = document.createElement("img");

                img.src = "src/Infografias/Webp/" + archivo;

                img.onerror = () => {
                    img.onerror = null;

                    img.src =
                        "src/Infografias/Webp/SinContenidoDisponible.webp";

                    img.dataset.archivo =
                        "SinContenidoDisponible.webp";

                    img.dataset.archivoSrc =
                        "./src/Infografias/Webp/SinContenidoDisponible.webp";
                };

                img.classList.add("InfografiaWebp");

                img.id = `Infografia-${idNivel}`;

                img.dataset.tipo = "webp";
                img.dataset.archivo = archivo;
                img.dataset.id = idNivel;
                img.dataset.archivoSrc =
                    `./src/Infografias/Webp/${archivo}`;

                nuevoNivel.appendChild(img);

                break;
            }

            case "pdf":
                cargarPdf(archivo, nuevoNivel, idNivel);
                break;

            default:
                console.log(
                    "Extensión de archivo sin soporte, prueba webp o pdf"
                );
        }
    }

    return nuevoNivel;
};

export { nivel, cargarPdf };
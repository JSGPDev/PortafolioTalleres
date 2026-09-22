import pdfjsLib from "../Js/pdf.js";

const cargarPdf = async (archivo, contenedor, id) => {
    const rutaPdf = "src/Infografias/Pdf/" + archivo;

    const pdf = await pdfjsLib.getDocument(rutaPdf).promise;

    let paginaActual = 1;

    const contenedorPdf = document.createElement("div");
    contenedorPdf.id = `Infografia-${id}`;
    contenedorPdf.dataset.archivoSrc = "./src/Infografias/Pdf/" + archivo;
    contenedorPdf.classList.add("ContenedorPdf");
    contenedorPdf.dataset.tipo = "pdf";
    contenedorPdf.dataset.archivo = archivo;
    contenedorPdf.dataset.id = id;

    const canvas = document.createElement("canvas");
    canvas.classList.add("InfografiaPdf");

    const renderizarPagina = async () => {
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
    };

    contenedorPdf.appendChild(canvas);

    // Si el PDF tiene más de una página,
    // se crean los controles.
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
                img.classList.add("InfografiaWebp");

                img.id = `Infografia-${idNivel}`;

                img.dataset.tipo = "webp";
                img.dataset.archivo = archivo;
                img.dataset.id = idNivel;
                img.dataset.archivoSrc = `./src/Infografias/Webp/${archivo}`

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
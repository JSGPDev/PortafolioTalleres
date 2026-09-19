const nivel = (archivo = null) => {
    const nuevoNivel = document.createElement('div');
    nuevoNivel.classList.add('Nivel');

    // esto tengo que tocarlo al implementar los pdf, ver si es webp o pdf, crear el elemento segun el tipo de archivo
    if (archivo !== null) {
        const extension = archivo.split('.').pop().toLowerCase();

        switch (extension) {
            case "webp":
                const img = document.createElement('img');
                img.src = "src/Infografias/Webp/" + archivo;
                img.classList.add('InfografiaWebp')
                nuevoNivel.appendChild(img);
                break;
            case "pdf":
                console.log("falta Configurar comportamiento para pdf")
                break;
            default:
                console.log("Extencion de archivo sin soporte, prueba webp o pdf")
        }
    }
    return nuevoNivel;
}

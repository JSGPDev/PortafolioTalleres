const buscarInfografias = async () => {
    try {
        const respuesta = await fetch('./manifest.json');

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        console.log(respuesta);
        console.log(datos.infografias);
        return datos.infografias;
    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
    }
}

export default buscarInfografias;

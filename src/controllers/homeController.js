

exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Pagina Inicial',
        numeros: [1, 2, 3, 4, 5, 6, 7]
    });
    return;
};

exports.enviarPost = (req, res) => {
    res.send(req.body);
    return;
};

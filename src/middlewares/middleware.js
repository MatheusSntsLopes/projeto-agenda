exports.meuMiddleware = (req,res,next) => {
    res.locals.VariavelLocal = 'Sou uma variavel local';
    next();
};

exports.checkCsrfToken = (err,req,res,next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
    }

    next();
};

exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};   
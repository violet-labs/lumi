import Swal from 'sweetalert2'

Swal.cAlert = function (html, options = {}) {
    const defaultOptions = {
        html,
    }

    options = { ...defaultOptions, ...options }

    return Swal.fire(options)
}

Swal.loading = function (text = 'Carregando...', options = {}) {
    const defaultOptions = {
        html: '<div class="spinner-border text-primary" role="status"></div><br><br>' + text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    };

    options = { ...defaultOptions, ...options };

    return Swal.fire(options);
};

Swal.loaded = function () {
    return Swal.close();
};

Swal.cInfo = function (html, options = {}) {
    const defaultOptions = {
        html,
        icon: 'info',
    }

    options = { ...defaultOptions, ...options }

    return Swal.fire(options)
}

Swal.cConfirm = function (html, callback, options = {}) {
    const defaultOptions = {
        html,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'SIM',
        cancelButtonText: 'NÃO',
    }

    options = { ...defaultOptions, ...options }

    return Swal.fire(options)
        .then((result) => {
            if (result.isConfirmed) {
                callback()
            }
        });
}

Swal.cWarning = function (html, options = {}) {
    const defaultOptions = {
        html,
        icon: 'warning',
    }

    options = { ...defaultOptions, ...options }

    return Swal.fire(options)
}

Swal.cError = function (html, options = {}) {
    const defaultOptions = {
        html,
        title: 'Ops...',
        icon: 'error',
    }

    options = { ...defaultOptions, ...options }

    return Swal.fire(options)
}

Swal.cSuccess = function (html, options = {}) {
    const defaultOptions = {
        html,
        title: getSuccessMessage(),
        icon: 'success',
    }

    options = { ...defaultOptions, ...options }

    return Swal.fire(options)
}

export default Swal

function getSuccessMessage() {
    var mensagens = [
        'Tudo em ordem!',
        'Pronto e feito!',
        'Missão completa!',
        'Deu certinho!',
        'Sucesso total!',
        'Finalizado com estilo!',
        'Tudo feito!',
        'Missão cumprida!',
        'Tudo nos conformes!',
        'Feito com capricho!',
        'Prontinho!',
        'Tá tudo certo!',
        'Concluído sem erro!',
        'Tudo sob controle!',
        'Finalizado com sucesso!',
        'Ação completada!',
        'Perfeito, deu certo!',
        'Tudo resolvido!',
        'Tudo ajeitado!'
    ];

    // Generate a random index
    var randomIndex = Math.floor(Math.random() * mensagens.length);

    // Return the message at the random index
    return mensagens[randomIndex];
}
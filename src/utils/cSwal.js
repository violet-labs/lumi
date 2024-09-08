import Swal from 'sweetalert2'

Swal.cAlert = function(html, options = {}) {
    const defaultOptions = {
        html,
    }

    options = { ...defaultOptions, ...options }

    Swal.fire(options)
}

Swal.loading = function(text = 'Carregando...', options = {}) {
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

    Swal.fire(options);
};

Swal.loaded = function() {
    Swal.close();
};

Swal.cInfo = function(html, options = {}) {
    const defaultOptions = {
        html,
        icon: 'info',
    }

    options = { ...defaultOptions, ...options }

    Swal.fire(options)
}

Swal.cConfirm = function(html, callback, options = {}) {
    const defaultOptions = {
        html,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'SIM',
        cancelButtonText: 'NÃO',
    }

    options = { ...defaultOptions, ...options }

    Swal.fire(options)
        .then((result) => {
            if (result.isConfirmed) {
                callback()
            }
        });
}

Swal.cWarning = function(html, options = {}) {
    const defaultOptions = {
        html,
        icon: 'warning',
    }

    options = { ...defaultOptions, ...options }

    Swal.fire(options)
}

Swal.cError = function(html, options = {}) {
    const defaultOptions = {
        html,
        title: 'Ops...',
        icon: 'error',
    }

    options = { ...defaultOptions, ...options }

    Swal.fire(options)
}

Swal.cSuccess = function(html, options = {}) {
    const defaultOptions = {
        html,
        title: 'Sucesso!',
        icon: 'success',
    }

    options = { ...defaultOptions, ...options }

    Swal.fire(options)
}

export default Swal
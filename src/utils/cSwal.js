import Swal from 'sweetalert2'

Swal.cAlert = function(html, options = {}) {
    const defaultOptions = {
        html,
    }

    options = { ...defaultOptions, options }

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

    options = { ...defaultOptions, options }

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

    options = { ...defaultOptions, options }

    Swal.fire(options)
}

Swal.cError = function(html, options = {}) {
    const defaultOptions = {
        html,
        title: 'Ops...',
        icon: 'error',
    }

    options = { ...defaultOptions, options }

    Swal.fire(options)
}

Swal.cSuccess = function(html, options = {}) {
    const defaultOptions = {
        html,
        title: 'Sucesso!',
        icon: 'success',
    }

    options = { ...defaultOptions, options }

    Swal.fire(options)
}

export default Swal
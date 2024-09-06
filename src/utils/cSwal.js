import Swal from 'sweetalert2'

Swal.cAlert = function(html, options = {}) {
    const defaultOptions = {
        html,
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
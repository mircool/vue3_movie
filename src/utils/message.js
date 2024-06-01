import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function successMessage(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'center',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
        },
    }).showToast()
}

export function errorMessage(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'center',
        style: {
            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        },
    }).showToast()
}

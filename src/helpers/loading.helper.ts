import Swal from "sweetalert2"

export const loading = (context: string) => {
    Swal.fire({
        title: `${context}...`,
        text: "Please wait",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading()
        },
    })
}
import { toast } from "sonner";
import Swal from "sweetalert2";

export const MessagesError = (message) => {
    toast.error(message);
};

export const MessagesSuccess = (message) => {
    toast.success(message);
};

export const MessagesInformation = (message) => {
    toast.info(message);
};

export const MessagesInfo = (title, message) => {
    Swal.fire({
        icon: "info",
        title: title,
        html: message,
        timer: 2000,
    })
};

export const showToastPromise = async (promiseFn, successMessage, errorMessage) => {
    await toast.promise(
        promiseFn,
        {
            loading: 'Cargando datos...',
            success: successMessage || "Operation completed!",
            error: errorMessage || "Something went wrong.",
        }
    );
};

export const showToastWarning = async (promise, warningMessage, errorMessage) => {
    try {
        const result = await promise;
        return result; // Si el promiseFn se ejecuta correctamente
    } catch (error) {
        if (error.condition === 'missingEndDate') {
            toast.warn(warningMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
}
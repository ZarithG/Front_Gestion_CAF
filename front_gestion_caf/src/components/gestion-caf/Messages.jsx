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

export const MessagesWarning = (message) => {
    toast.warning(message);
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
export const showToastWarning = async (promiseFn, successMessage, errorMessage, errorWarning) => {
    await toast.promise(
        promiseFn,
        {
            loading: 'Cargando datos...',
            success: successMessage || "Operation completed!",
            error: errorMessage || "Something went wrong.",
            warning: errorWarning || "Warning"
        }
    );
};


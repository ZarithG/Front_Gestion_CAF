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

export const MessagesInfo = (title,message) => {
    Swal.fire ({
        icon: "info",
        title: title,
        html: message,
        timer: 2000, 
    })
};
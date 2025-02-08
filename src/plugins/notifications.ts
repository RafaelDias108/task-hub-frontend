import { useToast } from "vue-toastification";

const notification = useToast()

export const Notification = {
    success(msg: string | any) {
        notification.success(msg);
    },
    error(msg: string | any) {
        notification.error(msg)
    },
    info(msg: string | any) {
        notification.info(msg)
    },
    warning(msg: string | any) {
        notification.warning(msg)
    }
}
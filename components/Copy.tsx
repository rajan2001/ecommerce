import toast from "react-hot-toast";

const onCopy = (description: string, message: string) => {
    navigator.clipboard.writeText(description);
    toast.success(message);
};


export default onCopy
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"




export const Model = ({ isOpen, onClose, title, description, children }: any) => {

    const onChange = () => {
        if (isOpen) {
            onClose()
        }
    }
    return <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
                <div>{children}</div>
            </DialogHeader>
        </DialogContent>
    </Dialog>

}
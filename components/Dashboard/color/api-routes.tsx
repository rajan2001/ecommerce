import { Separator } from "@/components/ui/separator"
import Header from "../heading"
import { ApiAlert } from "../api-alert"
import { useOrigin } from "@/hooks/use-origin"

export const ApiRoutes = ({ storeId }: { storeId: any }) => {
    const origin = useOrigin()

    return <div className="flex flex-col gap-4">
        <Header title={`API`} description="Api calls for Billboards" />
        <Separator />
        <ApiAlert
            title="GET"
            description={`${origin}/api/store/${storeId}/color`}
            varient="public"
        />
        <ApiAlert
            title="GET"
            description={`${origin}/api/store/${storeId}/color/{colorId}`}
            varient="public"
        />
        <ApiAlert
            title="POST"
            description={`${origin}/api/store/${storeId}/color`}
            varient="admin"
        />
        <ApiAlert
            title="PATCH"
            description={`${origin}/api/store/${storeId}/color/{colorId}`}
            varient="admin"
        />
        <ApiAlert
            title="DELETE"
            description={`${origin}/api/store/${storeId}/color/{colorId}`}
            varient="admin"
        />
    </div>
}
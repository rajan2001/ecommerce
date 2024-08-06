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
            description={`${origin}/api/store/${storeId}/product`}
            varient="public"
        />
        <ApiAlert
            title="GET"
            description={`${origin}/api/store/${storeId}/product/{productId}`}
            varient="public"
        />
        <ApiAlert
            title="POST"
            description={`${origin}/api/store/${storeId}/product`}
            varient="admin"
        />
        <ApiAlert
            title="PATCH"
            description={`${origin}/api/store/${storeId}/product/{productId}`}
            varient="admin"
        />
        <ApiAlert
            title="DELETE"
            description={`${origin}/api/store/${storeId}/product/{productId}`}
            varient="admin"
        />
    </div>
}
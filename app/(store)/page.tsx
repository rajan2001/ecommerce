import { getbillBoard } from "@/actions/get-billboard";
import { BillBoard } from "@/components/store/Billboard";

const Page = async () => {
    const data = await getbillBoard("cf7a1534-ff3b-484c-9d79-a88a019ca9be")
    return <div className="space-y-10">
        <BillBoard data={data} />

    </div>
}

export default Page;
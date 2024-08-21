import { getbillBoard } from "@/actions/get-billboard";
import { BillBoard } from "@/components/store/Billboard";
import { Product } from "@/components/store/Product";

const Page = async () => {
    const data = await getbillBoard("cf7a1534-ff3b-484c-9d79-a88a019ca9be")
    return <div className="space-y-10">
        <BillBoard data={data} />
        <Product />

    </div>
}

export default Page;
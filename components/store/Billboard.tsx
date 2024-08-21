import { Billboard as BillBoardType } from "@prisma/client"

interface BillBoardProps {
    data: BillBoardType
}

export const BillBoard: React.FC<BillBoardProps> = ({ data }) => {

    return <div className="rounded-lg overflow-hidden  relative">
        <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover" style={{ backgroundImage: `url(${data?.imageUrl})` }}>
            <div className="h-full w-full flex flex-col justify-center items-center cursor-pointer ">
                <div className="font-bold text-3xl md:text-5xl ld:text-6xl sm:max-w-xl max-w-xl bg-white p-4 rounded-xl text-center hover:scale-105 transition-all duration-500">{data?.label}</div>
            </div>
        </div>
    </div>
} 
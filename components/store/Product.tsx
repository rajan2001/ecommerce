import { ProductCard } from "./ProductCard"

export const Product = () => {
    return <div>
        <h1 className="text-3xl font-bold">Featured Products</h1>
        <div className="grid grid-cols-3 gap-4">
            <ProductCard />
        </div>
    </div>
}
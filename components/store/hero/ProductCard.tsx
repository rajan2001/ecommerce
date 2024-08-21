'use client'
import { Expand, Minus, Plus, ShoppingCart } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { Currency } from '../currancy';
import { ProductList } from '@/lib/randomProduct';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { IconsClassName } from '@/lib/config';
export const ProductCard = () => {
    const cart: any = useCart()

    return <div>
        <p className="text-2xl font-bold mb-10">Featured Products</p>

        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id='target-section'>
            {ProductList.map((product) =>
                <div key={product.id} className=" border bg-white rounded-xl p-4 cursor-pointer space-y-4 group ">
                    <div className='overflow-hidden rounded-xl bg-gray-100 relative aspect-square'>

                        <CldImage
                            alt='Product'
                            width="600"
                            height="600"
                            className='object-cover w-full h-full  grayscale hover:grayscale-0 transition-all '
                            src={product.images} />
                        <div className=' opacity-0 group-hover:opacity-100 transition absolute bottom-5 w-full p-6'>
                            <div className='flex items-center gap-x-6 justify-center'>
                                <button className='text-gray-600 bg-white flex items-center justify-center shadow-md p-2 hover:scale-110 transition rounded-full'>
                                    <Expand size={20} />
                                </button>
                                <button className='text-gray-600 bg-white flex items-center justify-center shadow-md p-2 hover:scale-110 transition rounded-full'>
                                    <ShoppingCart size={20} onClick={() => cart.additem(product)} />
                                </button>
                            </div>
                        </div>

                    </div>

                    <div>
                        <div className=' flex items-center justify-between'>

                            <p className='font-semibold text-lg'>{product.name}</p>
                            {cart.items.find((item: any) => item.id == product.id) && <div className='flex items-center justify-center gap-x-2'>
                                <button className='bg-black text-white rounded-full p-1 '>
                                    <Minus className={cn(IconsClassName)} onClick={() => cart.removeNumberItem(product)} />
                                </button>
                                <span>{cart.items.find((item: any) => item.id == product.id).count}</span>
                                <button className='bg-black text-white rounded-full p-1'>
                                    <Plus className={cn(IconsClassName)} onClick={() => cart.addNumberItem(product)} />
                                </button>
                            </div>}
                        </div>
                        <p className='text-sm text-gray-500'>{product.categroy}</p>

                    </div>
                    <div>
                        <Currency value={product.price} currency={product.currency} />
                    </div>


                </div>
            )}

        </div>
    </div>
}
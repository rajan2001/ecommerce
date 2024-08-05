


const Page = async ({ params }: any) => {
    const storename = await prisma?.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return <div> hellooo {storename?.name}</div>

}

export default Page;
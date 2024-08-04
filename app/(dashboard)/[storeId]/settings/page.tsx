import { SettingsForm } from "@/components/Dashboard/settings-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface SettingsPageProps {
    params: {
        storeId: string;
    };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prisma?.store.findFirst({
        where: {
            id: params?.storeId,
            userId: userId
        }
    })

    if (!store) {
        redirect("/")
    }

    return (
        <div className=" flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
};

export default SettingsPage;

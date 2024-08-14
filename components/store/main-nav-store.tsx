"use client";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface MainNavBarStoreProps {
    data: Category[]
}

const MainNavBarStore = ({
    data
}: MainNavBarStoreProps) => {
    const pathname = usePathname();

    const routes = data.map((data) =>
    ({
        href: `/category/${data.id}`,
        label: data.name,
        active: pathname === `/category/${data.id}`
    })
    )
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6")}>
            {routes.map((route) => (
                <Link
                    href={route.href}
                    key={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white"
                            : "text-muted-foreground"
                    )}>
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

export default MainNavBarStore;

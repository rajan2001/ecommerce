"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNavBar = ({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/admin/${params.storeId}`,
            label: "DashBoard",
            active: pathname === `/admin/${params.storeId}`
        },
        {
            href: `/admin/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathname === `/admin/${params.storeId}/billboards`
        },
        {
            href: `/admin/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/admin/${params.storeId}/categories`
        },
        {
            href: `/admin/${params.storeId}/color`,
            label: "Color",
            active: pathname === `/admin/${params.storeId}/color`
        },
        {
            href: `/admin/${params.storeId}/size`,
            label: "Size",
            active: pathname === `/admin/${params.storeId}/size`
        },
        {
            href: `/admin/${params.storeId}/product`,
            label: "Product",
            active: pathname === `/admin/${params.storeId}/product`
        },
        {
            href: `/admin/${params.storeId}/order`,
            label: "Order",
            active: pathname === `/admin/${params.storeId}/order`
        },
        {
            href: `/admin/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/admin/${params.storeId}/settings`,
        }
    ];
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
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

export default MainNavBar;

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
            href: `/`,
            label: "Clothing",
            active: pathname === `/Clothing`
        },
        {
            href: `/`,
            label: "Footwear",
            active: pathname === `/Footwear`
        },
        {
            href: `/`,
            label: "Sport & Active Wear",
            active: pathname === `/Sport`
        },
        {
            href: `/`,
            label: "Accessories",
            active: pathname === `/Accessories`
        },


    ];
    return (
        <nav className={cn("flex items-center flex-col space-y-6 lg:flex-row lg:space-x-6", className)}>
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

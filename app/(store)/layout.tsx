import { Footer } from "@/components/store/footer";
import { NavBar } from "@/components/store/Navbar";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google"


const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html lang="en">
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}>
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>

    );
}

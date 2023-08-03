import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { Navigation } from "@/components/Navigation";
import StoreSwitcher from "@/components/StoreSwitcher";

import { ThemeToggle } from "./ui/ThemeToggle";

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    })

    return ( 
        <div className="border-b">
            <div className="h-16 flex items-center px-4">
                <StoreSwitcher items={stores} />
                <Navigation className="mx-6" />
                <div className="flex items-center space-x-4 ml-auto">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;
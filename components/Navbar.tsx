import { UserButton } from "@clerk/nextjs";

import { Navigation } from "@/components/Navigation";
import StoreSwitcher from "@/components/StoreSwitcher";

const Navbar = () => {
    return ( 
        <div className="border-b">
            <div className="h-16 flex items-center px-4">
                <StoreSwitcher />
                <Navigation className="mx-6" />
                <div className="flex items-center space-x-4 ml-auto">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;
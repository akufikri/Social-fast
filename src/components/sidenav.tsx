import { HomeIcon, Search, SquarePlus, UserCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Usermenu } from "./user-menu";


const navItem = [
      { name: "Home", href: "/w", icon: <HomeIcon /> },
      { name: "Create", href: "/w/create", icon: <SquarePlus /> },
      { name: "Search", href: "/w/search", icon: <Search /> },
      { name: "Profile", href: "/w/profile", icon: <UserCircle /> },
];

export async function Sidenav() {
      const { isAuthenticated } = getKindeServerSession()
      return (
            <>
                  <aside className="h-screen fixed w-56 border-r p-5 z-50 bg-[#020817]">
                        {/* logo */}
                        <div className="mb-5 text-center">{/* Add your logo here */}</div>
                        {/* logo */}

                        {/* menu */}
                        <ul className="space-y-3">
                              {navItem.map((item, index) => (
                                    <li key={index}>
                                          <Link href={item.href} className="flex items-center text-gray-200  p-2 rounded-md">
                                                {item.icon} <span className="ml-3">{item.name}</span>
                                          </Link>
                                    </li>
                              ))}
                              <div className="absolute bottom-3 w-full right-0">
                                    <div className="m-5">
                                          {(await isAuthenticated()) ? (
                                                <>
                                                      <Usermenu />
                                                </>
                                          ) : (
                                                <>

                                                </>
                                          )}
                                    </div>
                              </div>
                        </ul>
                        {/* menu */}
                  </aside>
            </>
      );
}

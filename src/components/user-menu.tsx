import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Usermenu() {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      return (
            <>
                  <div className="flex items-center"> {/* Main container with flex */}
                        <DropdownMenu>
                              <DropdownMenuTrigger className="flex items-center gap-2">
                                    <Avatar>
                                          <AvatarImage src={user?.picture as string} />
                                          <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="text-start">
                                          <span>{user?.given_name as string} {""} {user?.family_name as string}</span>
                                    </div>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="mb-4">
                                    <DropdownMenuItem>
                                          <LogOut className="me-5" />
                                          <LogoutLink>Logout</LogoutLink>
                                    </DropdownMenuItem>
                              </DropdownMenuContent>
                        </DropdownMenu>
                  </div>
            </>
      );
}

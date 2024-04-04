import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { Sidenav } from "@/components/sidenav";
import { Friends } from "@/components/friends";
// save to db
async function getData({
      email,
      id,
      firstName,
      lastName,
      picture
}: {
      email: string,
      id: string,
      firstName: string,
      lastName: string,
      picture: string | undefined | null
}) {
      const user = await prisma.user.findUnique({
            where: {
                  id: id,
            },
            select: {
                  id: true
            }
      });

      if (!user) {
            const fullName = `${firstName ?? ''}${lastName ?? ''}`
            await prisma.user.create({
                  data: {
                        id: id,
                        email: email,
                        fullName: fullName,
                        profile: picture
                  }
            })
      }
}
export default async function Layouts({ children }: { children: ReactNode }) {
      const { getUser } = getKindeServerSession()
      const user = await getUser();
      if (!user) {
            redirect('/')
      }
      await getData({ email: user.email as string, firstName: user.given_name as string, id: user.id as string, lastName: user.family_name as string, picture: user.picture as string })
      return (
            <>
                  <main>
                        <Sidenav />
                        <div className="sm:ml-56 p-4 ">
                              {children}
                        </div>
                        {/* <Friends /> */}
                  </main>
            </>
      )
}
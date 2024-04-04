import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { useRef } from "react";

export async function FormPost() {
      const { getUser } = getKindeServerSession()
      const user = await getUser()

      async function postData(formData: FormData) {
            "use server"

            if (!user) {
                  throw new Error("Not authorized")
            }

            const content = formData.get('content') as string
            await prisma.post.create({
                  data: {
                        userId: user?.id,
                        content: content,
                  }
            })
            return
      }

      return (
            <>
                  <Card>
                        <form action={postData}>
                              <CardHeader>
                                    <div className="flex justify-between">
                                          <div className="flex gap-4">
                                                <Avatar>
                                                      <AvatarImage src={user?.picture as string} />
                                                      <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                      <span className="text-sm">{user?.given_name}{""} {user?.family_name}</span>
                                                      <span className="block text-sm text-muted-foreground">{user?.email}</span>
                                                </div>
                                          </div>
                                          <div>
                                                <Button type="submit">Create</Button>
                                          </div>
                                    </div>
                              </CardHeader>
                              <CardContent>
                                    <Textarea name="content" placeholder="💡what are you thinking today" />
                              </CardContent>
                        </form>
                  </Card>
            </>
      )
}
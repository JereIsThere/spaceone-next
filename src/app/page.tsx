import LinkButton from "@/components/LinkButton";
import { authOptions } from "./auth/nextauth"
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <>
        <h1 style={{width: '100%', textAlign: 'center'}}>Welcome to the Homepage!</h1>
        {
          (!!user)
          ?<h2 style={{width: '100%', textAlign: 'center'}}>You are logged in as {session?.user?.name}</h2>
          : <LinkButton link="/login" text="Login!"/> 
        }
        
    </>
  )
}

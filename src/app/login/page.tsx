"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zfd } from 'zod-form-data';

const schema = zfd.formData({
    username: zfd.text(),
    password: zfd.text(),
})

function LoginPage() {

    const { data, status } = useSession();
    const router = useRouter();

    const handleSubmit = async (data: FormData) => {
        const credentials = schema.parse(data);

        console.log("trying to sign in...   ")
        const result = await signIn('credentials', {redirect: false, ...credentials});
        if(!result?.ok ?? false){
            alert("Credentials invalid.")
        }
        router.refresh()
    };
    const signOutHandler = async () => {
        const result = await signOut({redirect: false})
        router.refresh()
    }

    if (status === "loading")
    return <p>warte kurz</p>

    return (
        status === "authenticated" ? 
        <p>Logged in as {data.user?.name} <br/><button onClick={signOutHandler}>logout</button></p>
        :
        <form action={handleSubmit}>
            <label>
                Username
                <input name="username" type="text" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button type="submit">Sign In</button>
        </form>
    );
}

export default LoginPage;
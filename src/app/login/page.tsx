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

        console.log("Entered callback!", credentials)
        // console.log(e)

        const result = await signIn('credentials', {redirect: false, ...credentials});
        router.refresh()
    };

    if (status === "loading")
    return <p>warte kurz</p>

    return (
        status === "authenticated" ? 
        <p>Fuck you {data.user?.name} <br/><button onClick={() => signOut()}>logout</button></p>
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
"use client";

import { signIn } from 'next-auth/react';
import { zfd } from 'zod-form-data';

const schema = zfd.formData({
    username: zfd.text(),
    password: zfd.text(),
})

function LoginPage() {
    const handleSubmit = async (data: FormData) => {
        const credentials = schema.parse(data);

        console.log("Entered callback!", credentials)
        // console.log(e)

        const result = await signIn('ldap', credentials);
        alert(result)
    };

    return (
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
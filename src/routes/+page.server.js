import {error, fail, redirect} from '@sveltejs/kit';
import {createUser, createUserSession, login, logout} from "$lib/server/services/users.js";
import {userCreateSchema,userLoginSchema} from "$lib/utils/validation.js";
import {authUserSession, clearAuthCookies, createAuthCookies} from "$lib/server/auth.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const {user,message} = await authUserSession(cookies)

    if (!user){
        return {error:true,message:message};
    }

    redirect(307, `${user.uuid}/keep`);
}
/** @satisfies {import('./$types').Actions} */
export const actions = {
    signUp: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        const repeatPassword = data.get('repeatPassword');
        const result = userCreateSchema.safeParse({email,password,repeatPassword});
        if (!result.success) {
            return fail(400, {error:true, message: 'Invalid input', issues: result.error.flatten()});
        }
        const { email:validEmail, password:validPassword } = result.data;

        const newUserData = await createUser(validEmail, validPassword);
        if (newUserData.error) {
            return {error: true, message: newUserData.message};
        }
        if (!newUserData.data) {
            return {error: true, message: "New user data is corrupt"};
        }
        const newUser = newUserData.data
        const loggedUser = await login(newUser.email, validPassword)
        const [accessToken,refreshToken] = await createUserSession(loggedUser);
        for (const c of createAuthCookies(accessToken, refreshToken,false)) cookies.set(c.name,c.token,c.params);

        if (loggedUser) {
            redirect(301, `/${loggedUser.uuid}/keep`);
        }
        return {error: false, message: "User created successfully"};

    },
    signIn: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        const result = userLoginSchema.safeParse({email,password});
        if (!result.success) {
            return fail(400, {error:true, message: 'Invalid input', issues: result.error.flatten()});
        }
        const { email:validEmail, password:validPassword } = result.data;
        const user = await login(validEmail, validPassword);
        const [accessToken,refreshToken] = await createUserSession(user);
        for (const c of createAuthCookies(accessToken, refreshToken,false)) cookies.set(c.name,c.token,c.params);

        if (user) {
            redirect(301, `/${user.uuid}/keep`);
        }
        return {error: true, message: "Could not login"};

    },
    signOut: async ({cookies}) => {
        const {user,message} = await authUserSession(cookies);
        if (!user) error(401, message);

        await logout(user)
        for (const c of clearAuthCookies(false)) cookies.set(c.name,c.token,c.params);

        return redirect(307,'/')
    }
};

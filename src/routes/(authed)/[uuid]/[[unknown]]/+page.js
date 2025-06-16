import {redirect} from "@sveltejs/kit";


export async function load({parent}) {
    const { pathUUID } = await parent();
    redirect(307, `/${pathUUID}/keep`);
}

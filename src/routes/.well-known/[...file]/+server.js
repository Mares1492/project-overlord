import {error} from "@sveltejs/kit";

export function GET() {
    error(404,{message:'Not found'})
}

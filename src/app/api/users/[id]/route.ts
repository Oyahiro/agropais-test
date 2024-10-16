import {NextResponse} from 'next/server';
import {supabase} from "../../../../../lib/supabase-client";

export async function GET(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    // Lógica para obtener un usuario por ID
    const user = {id, name: 'John Doe'};
    return NextResponse.json(user);
}

export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    const body = await req.json();
    const updatedUser = {id, ...body};
    return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    console.log("ID:", id)

    try {
        const {error} = await supabase
            .from("users")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json(
                {message: `Failed to delete user with id ${id}: ${error.message}`},
                {status: 400}
            );
        }

        return NextResponse.json({message: `User with id ${id} deleted`}, {status: 200});
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            {message: "Server error"},
            {status: 500}
        );
    }
}

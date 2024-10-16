import {NextResponse} from 'next/server';

export async function GET(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    // Lógica para obtener un usuario por ID
    const user = {id, name: 'John Doe'};
    return NextResponse.json(user);
}

export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    const body = await req.json();
    // Lógica para actualizar el usuario con `id` usando `body`
    const updatedUser = {id, ...body};
    return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    // Lógica para eliminar el usuario con `id`
    return NextResponse.json({message: `User with id ${id} deleted`}, {status: 200});
}

import {User} from "@/components/types/user";
import UserForm from "@/components/users/user-form";

async function getUsers(): Promise<User[]> {
    const res = await fetch('http://localhost:3000/api/users', {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Error al obtener los usuarios');
    }

    return res.json();
}

export default async function UsersPage() {
    const users = await getUsers();
    console.log(users);

    return (
        <div
            className="items-center justify-items-center min-h-screen p-12 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <h2 className="mb-8 text-center text-3xl font-bold">Users</h2>
            <UserForm/>
        </div>
    )
}

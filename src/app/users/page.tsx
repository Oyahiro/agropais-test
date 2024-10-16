import {User} from "@/components/types/user";

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

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {JSON.stringify(users, null, 2)}
        </div>
    )
}

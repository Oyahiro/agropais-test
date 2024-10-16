import {UserFullData} from "@/components/types/user";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import AddUserSection from "@/components/users/add-user-section";
import UserCard from "@/components/users/user-card";
import * as React from "react";

async function getUsers(): Promise<UserFullData[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Error getting users');
    }

    return res.json();
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div
            className="items-center justify-items-center min-h-screen p-12 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <h2 className="mb-8 text-center text-3xl font-bold">Users</h2>
            <AddUserSection/>

            <Accordion type="single" collapsible className="space-y-4 my-8">
                {users.map((user: UserFullData) => (
                    <AccordionItem key={user.id} value={`item-${user.id}`} className="border rounded-lg shadow-sm">
                        <AccordionTrigger
                            className="py-3 px-4 flex justify-between items-center font-medium bg-gray-100 rounded-t-lg">
                            <span>{user.name} {user.last_name} - {user.ci}</span>
                            <span className="text-sm text-gray-500">{user.gender}</span>
                        </AccordionTrigger>
                        <AccordionContent className="bg-white px-6 py-4 border-t">
                            <UserCard user={user}/>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

        </div>
    )
}

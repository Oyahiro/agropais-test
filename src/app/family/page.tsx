import Image from "next/image";
import * as React from "react";

export default async function FamilyPage() {
    return (
        <div
            className="items-center justify-items-center min-h-screen p-12 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <h2 className="mb-8 text-center text-3xl font-bold">Family Members</h2>
            <div className="flex flex-col gap-8 items-center">
                <Image src="https://anvjdytvexdhslzdbgoc.supabase.co/storage/v1/object/public/images/meme.webp"
                       alt="Meme"
                       width={500}
                       height={500}
                />
            </div>
        </div>
    )
}

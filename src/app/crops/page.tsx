import {DataTable} from "@/components/system-design/data-table";
import {CropSummary} from "@/components/types/crop";
import {ColumnDef} from "@tanstack/table-core";
import * as React from "react";

const columns: ColumnDef<CropSummary>[] = [
    {
        accessorKey: "crop_name",
        header: "Crop Name",
    },
    {
        accessorKey: "count",
        header: "Count",
    },
];

async function getCropsData(): Promise<CropSummary[]> {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/crops`);
    //
    // if (!response.ok) {
    //     throw new Error("Error fetching crops data");
    // }
    //
    // return response.json();
    return []
}

export default async function CropsPage() {
    const data = await getCropsData();

    return (
        <div
            className="flex flex-col items-center min-h-screen p-12 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <h2 className="mb-8 text-center text-3xl font-bold">Crops</h2>
            <div className="w-full max-w-md">
                <DataTable columns={columns} data={data}/>
            </div>
        </div>
    );
}

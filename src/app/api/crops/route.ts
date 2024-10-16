import {CropSummary} from "@/components/types/crop";
import {NextResponse} from "next/server";
import {supabase} from "../../../../lib/supabase-client";

export async function GET() {
    try {
        const {data, error} = await supabase
            .from("crops")
            .select("crop_name");

        if (error) {
            return NextResponse.json({message: `Error fetching crops: ${error.message}`}, {status: 400});
        }

        const cropCounts: Record<string, number> = data.reduce((acc, crop) => {
            acc[crop.crop_name] = (acc[crop.crop_name] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const cropSummary: CropSummary[] = Object.entries(cropCounts).map(
            ([crop_name, count]) => ({
                crop_name,
                count,
            })
        );

        return NextResponse.json(cropSummary, {status: 200});
    } catch (error) {
        console.error("Error fetching crops:", error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}
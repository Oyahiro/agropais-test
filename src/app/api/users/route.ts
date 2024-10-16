import {FamilyMemberFormData} from "@/utils/validation-schemas";
import {NextResponse} from 'next/server';
import {z} from "zod";
import {supabase} from "../../../../lib/supabase-client";

const userSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    ci: z.string().length(10),
    dateOfBirth: z.string(),
    hasRuc: z.boolean(),
    rucNumber: z.string().optional(),
    gender: z.string(),
    hasFarm: z.boolean(),
    farmHa: z.number().optional(),
    farmName: z.string().optional(),
    crops: z.array(z.string()).optional(),
    hasWorkers: z.boolean(),
    totalWorkers: z.number().optional(),
    menWorkers: z.number().optional(),
    womanWorkers: z.number().optional(),
    over18Workers: z.number().optional(),
    under18Workers: z.number().optional(),
    minorWorkersOccupation: z.string().optional(),
    hasPregnantWorkers: z.boolean(),
    pregnantWorkers: z.number().optional(),
    pregnantWorkersOccupation: z.string().optional(),
    family: z.array(
        z.object({
            name: z.string(),
            lastName: z.string(),
            ci: z.string().length(10),
        })
    ).min(1, "At least one family member is required."),
});

export async function GET() {
    try {
        const {data: users, error: userError} = await supabase
            .from("users")
            .select(`*`);

        if (userError) {
            return NextResponse.json({error: userError.message}, {status: 400});
        }

        const {data: crops, error: cropError} = await supabase
            .from("crops")
            .select(`*`);

        if (cropError) {
            return NextResponse.json({error: cropError.message}, {status: 400});
        }

        const {data: familyMembers, error: familyError} = await supabase
            .from("family_members")
            .select(`*`);

        if (familyError) {
            return NextResponse.json({error: familyError.message}, {status: 400});
        }

        const usersWithRelations = users.map(user => {
            return {
                ...user,
                crops: crops.filter(crop => crop.user_id === user.id),
                family_members: familyMembers.filter(member => member.user_id === user.id),
            };
        });

        return NextResponse.json(usersWithRelations, {status: 200});
    } catch (error) {
        console.error("Error getting users:", error);
        return NextResponse.json({error: "Something went wrong."}, {status: 500});
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = userSchema.parse(body);

        const {data: userData, error: userError} = await supabase
            .from("users")
            .insert({
                name: data.name,
                last_name: data.lastName,
                ci: data.ci,
                date_of_birth: data.dateOfBirth,
                has_ruc: data.hasRuc,
                ruc_number: data.rucNumber || null,
                gender: data.gender,
                has_farm: data.hasFarm,
                farm_ha: data.farmHa || null,
                farm_name: data.farmName || null,
                has_workers: data.hasWorkers,
                total_workers: data.totalWorkers || null,
                men_workers: data.menWorkers || null,
                woman_workers: data.womanWorkers || null,
                over18_workers: data.over18Workers || null,
                under18_workers: data.under18Workers || null,
                minor_workers_occupation: data.minorWorkersOccupation || null,
                has_pregnant_workers: data.hasPregnantWorkers,
                pregnant_workers: data.pregnantWorkers || null,
                pregnant_workers_occupation: data.pregnantWorkersOccupation || null,
            })
            .select()
            .single();

        if (userError) {
            return NextResponse.json(
                {error: userError.message},
                {status: 400}
            );
        }

        const familyMembers = data.family.map((member: FamilyMemberFormData) => ({
            user_id: userData.id,
            name: member.name,
            last_name: member.lastName,
            ci: member.ci,
        }));

        const {error: familyError} = await supabase
            .from("family_members")
            .insert(familyMembers);

        if (familyError) {
            return NextResponse.json(
                {error: familyError.message},
                {status: 400}
            );
        }

        if (data.crops && data.crops.length > 0) {
            const crops = data.crops.map((crop) => ({
                user_id: userData.id,
                crop_name: crop,
            }));

            const {error: cropsError} = await supabase
                .from("crops")
                .insert(crops);

            if (cropsError) {
                return NextResponse.json(
                    {error: cropsError.message},
                    {status: 400}
                );
            }
        }

        return NextResponse.json({message: "User and related data saved successfully."}, {status: 201});
    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({error: "Something went wrong."}, {status: 500});
    }
}

import {NextResponse} from 'next/server';
import {supabase} from "../../../../../lib/supabase-client";

export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;
    const body = await req.json();

    const {
        name,
        lastName,
        ci,
        dateOfBirth,
        hasRuc,
        rucNumber,
        gender,
        hasFarm,
        farmHa,
        farmName,
        crops,
        hasWorkers,
        totalWorkers,
        menWorkers,
        womanWorkers,
        over18Workers,
        under18Workers,
        minorWorkersOccupation,
        hasPregnantWorkers,
        pregnantWorkers,
        pregnantWorkersOccupation,
        family,
    } = body;

    try {
        const {error: userError} = await supabase
            .from("users")
            .update({
                name,
                last_name: lastName,
                ci,
                date_of_birth: dateOfBirth,
                has_ruc: hasRuc,
                ruc_number: rucNumber,
                gender,
                has_farm: hasFarm,
                farm_ha: farmHa,
                farm_name: farmName,
                has_workers: hasWorkers,
                total_workers: totalWorkers,
                men_workers: menWorkers,
                woman_workers: womanWorkers,
                over18_workers: over18Workers,
                under18_workers: under18Workers,
                minor_workers_occupation: minorWorkersOccupation,
                has_pregnant_workers: hasPregnantWorkers,
                pregnant_workers: pregnantWorkers,
                pregnant_workers_occupation: pregnantWorkersOccupation,
            })
            .eq("id", id);

        if (userError) {
            console.log("Error updating user:", userError);
            return NextResponse.json({message: `Error updating user: ${userError.message}`}, {status: 400});
        }

        const {error: cropsDeleteError} = await supabase
            .from("crops")
            .delete()
            .eq("user_id", id);

        if (cropsDeleteError) {
            console.log("Error deleting crops:", cropsDeleteError);
            return NextResponse.json({message: `Error deleting crops: ${cropsDeleteError.message}`}, {status: 400});
        }

        const {error: familyDeleteError} = await supabase
            .from("family_members")
            .delete()
            .eq("user_id", id);

        if (familyDeleteError) {
            console.log("Error deleting family members:", familyDeleteError);
            return NextResponse.json({message: `Error deleting family members: ${familyDeleteError.message}`}, {status: 400});
        }

        if (crops && crops.length > 0) {
            const cropsData = crops.map((crop: string) => ({
                user_id: id,
                crop_name: crop,
            }));

            const {error: cropsInsertError} = await supabase
                .from("crops")
                .insert(cropsData);

            if (cropsInsertError) {
                return NextResponse.json({message: `Error inserting crops: ${cropsInsertError.message}`}, {status: 400});
            }
        }

        if (family && family.length > 0) {
            const familyData = family.map((member: { name: string; lastName: string; ci: string }) => ({
                user_id: id,
                name: member.name,
                last_name: member.lastName,
                ci: member.ci,
            }));

            const {error: familyInsertError} = await supabase
                .from("family_members")
                .insert(familyData);

            if (familyInsertError) {
                return NextResponse.json({message: `Error inserting family members: ${familyInsertError.message}`}, {status: 400});
            }
        }

        return NextResponse.json({message: `User with id ${id} updated successfully`}, {status: 200});
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({message: "Server error"}, {status: 500});
    }
}


export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const {id} = params;

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

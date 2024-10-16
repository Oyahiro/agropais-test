export type Crop = {
    id: string;
    user_id: string;
    crop_name: string;
};

export type FamilyMember = {
    id: string;
    user_id: string;
    name: string;
    last_name: string;
    ci: string;
};

export type UserFullData = {
    id: string;
    name: string;
    last_name: string;
    ci: string;
    date_of_birth: string;
    has_ruc: boolean;
    ruc_number?: string | null;
    gender: string;
    has_farm: boolean;
    farm_ha?: number | null;
    farm_name?: string | null;
    has_workers: boolean;
    total_workers?: number | null;
    men_workers?: number | null;
    woman_workers?: number | null;
    over18_workers?: number | null;
    under18_workers?: number | null;
    minor_workers_occupation?: string | null;
    has_pregnant_workers: boolean;
    pregnant_workers?: number | null;
    pregnant_workers_occupation?: string | null;
    crops: Crop[];
    family_members: FamilyMember[];
};
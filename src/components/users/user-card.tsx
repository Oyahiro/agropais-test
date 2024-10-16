import {UserFullData} from "@/components/types/user";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import * as React from "react";

interface Props {
    user: UserFullData;
}

export default async function UserCard({user}: Props) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-md font-semibold">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold">Name:</p>
                            <p className="text-sm">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Last Name:</p>
                            <p className="text-sm">{user.last_name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">CI:</p>
                            <p className="text-sm">{user.ci}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Date of Birth:</p>
                            <p className="text-sm">{new Date(user.date_of_birth).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Has RUC:</p>
                            <p className="text-sm">{user.has_ruc ? "Yes" : "No"}</p>
                        </div>
                        {user.has_ruc && (
                            <div>
                                <p className="text-sm font-semibold">RUC Number:</p>
                                <p className="text-sm">{user.ruc_number}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {user.has_farm && (
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-md font-semibold">Farm Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-semibold">Farm Name:</p>
                                <p className="text-sm">{user.farm_name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Hectares:</p>
                                <p className="text-sm">{user.farm_ha}</p>
                            </div>
                        </div>
                        {user.crops.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-semibold">Crops:</p>
                                <ul className="list-disc list-inside text-sm">
                                    {user.crops.map((crop) => (
                                        <li key={crop.id}>{crop.crop_name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {user.has_workers && (
                <Card className="border shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-md font-semibold">Worker Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <p className="text-sm font-semibold">Total Workers:</p>
                                <p className="text-sm">{user.total_workers}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Men Workers:</p>
                                <p className="text-sm">{user.men_workers}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Women Workers:</p>
                                <p className="text-sm">{user.woman_workers}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Under 18 Workers:</p>
                                <p className="text-sm">{user.under18_workers}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Over 18 Workers:</p>
                                <p className="text-sm">{user.over18_workers}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Pregnant Workers:</p>
                                <p className="text-sm">{user.pregnant_workers}</p>
                            </div>
                            {user.minor_workers_occupation && (
                                <div className="lg:col-span-2">
                                    <p className="text-sm font-semibold">Occupation of Minor
                                        Workers:</p>
                                    <p className="text-sm">{user.minor_workers_occupation}</p>
                                </div>
                            )}
                            {user.pregnant_workers_occupation && (
                                <div className="lg:col-span-2">
                                    <p className="text-sm font-semibold">Occupation of Pregnant
                                        Workers:</p>
                                    <p className="text-sm">{user.pregnant_workers_occupation}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {user.family_members.length > 0 && (
                <Card className="border shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-md font-semibold">Family Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {user.family_members.map((member) => (
                                <li key={member.id} className="text-sm border-b pb-2">
                                    <strong>{member.name} {member.last_name}</strong> -
                                    CI: {member.ci}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
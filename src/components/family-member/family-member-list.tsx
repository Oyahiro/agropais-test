"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {UserFormData} from "@/utils/validation-schemas";
import * as React from "react";
import {UseFormReturn} from "react-hook-form";

interface Props {
    form: UseFormReturn<UserFormData>;
}

export default function FamilyMemberList({form}: Props) {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {form.watch("family")?.map((member, index) => (
                <Card key={index} className="border p-2">
                    <CardHeader>
                        <CardTitle>Family Member {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            <strong>Name:</strong> {member.name}
                        </p>
                        <p className="text-sm">
                            <strong>Last Name:</strong> {member.lastName}
                        </p>
                        <p className="text-sm">
                            <strong>CI:</strong> {member.ci}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>

    );
}
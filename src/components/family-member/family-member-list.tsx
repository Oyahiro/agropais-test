"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {UserFormData} from "@/utils/validation-schemas";
import {Cross2Icon} from "@radix-ui/react-icons";
import * as React from "react";
import {UseFormReturn} from "react-hook-form";

interface Props {
    form: UseFormReturn<UserFormData>;
}

const FamilyMemberList = ({form}: Props) => {
    const removeFamilyMember = (index: number) => {
        const currentFamily = form.getValues("family") || [];
        const updatedFamily = currentFamily.filter((_, i) => i !== index);
        form.setValue("family", updatedFamily);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {form.watch("family")?.map((member, index) => (
                <Card key={index} className="border p-2 relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFamilyMember(index)}
                        aria-label="Remove family member"
                    >
                        <Cross2Icon className="h-4 w-4 text-red-500"/>
                    </Button>
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

export default FamilyMemberList;

"use client";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FamilyMemberFormData, familyMemberSchema, UserFormData} from "@/utils/validation-schemas";
import {yupResolver} from "@hookform/resolvers/yup";
import * as React from "react";
import {useForm, UseFormReturn} from "react-hook-form";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    form: UseFormReturn<UserFormData>;
}

export default function FamilyMemberDialog({open, setOpen, form}: Props) {

    const familyForm = useForm<FamilyMemberFormData>({
        resolver: yupResolver(familyMemberSchema),
        defaultValues: {
            name: "",
            lastName: "",
            ci: "",
        },
    });

    const onAddFamilyMember = (data: FamilyMemberFormData) => {
        const currentFamily = form.getValues("family") || [];
        form.setValue("family", [...currentFamily, data]);
        setOpen(false);
        familyForm.reset();
    };

    return (
        <div className="space-y-4">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent onEscapeKeyDown={() => familyForm.reset()}>
                    <DialogHeader>
                        <DialogTitle>Add Family Member</DialogTitle>
                    </DialogHeader>
                    <Form {...familyForm}>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                await familyForm.handleSubmit(onAddFamilyMember)(e);
                            }}
                            className="space-y-4"
                        >
                            <FormField
                                control={familyForm.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter family member's name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={familyForm.control}
                                name="lastName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter family member's last name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={familyForm.control}
                                name="ci"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>CI (Identity Card)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter CI number" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Save
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
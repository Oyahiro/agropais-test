"use client"

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {UserFormData} from "@/utils/validation-schemas";
import {UseFormReturn} from "react-hook-form";

interface props {
    form: UseFormReturn<UserFormData>;
}

export default function FarmFormSection({form}: props) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <FormField
                control={form.control}
                name="farmHa"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Hectares of the farm</FormLabel>
                        <FormControl>
                            <Input min={0} type="number"
                                   placeholder="Put the hectares of the farm" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="farmName"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name of the farm</FormLabel>
                        <FormControl>
                            <Input placeholder="Put the name of the farm" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
}

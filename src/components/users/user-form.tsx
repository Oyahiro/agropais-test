"use client"

import FamilyMemberDialog from "@/components/family-member/family-member-dialog";
import FamilyMemberList from "@/components/family-member/family-member-list";
import MultipleSelector from "@/components/system-design/multiple-selector";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import FarmFormSection from "@/components/users/farm-form-section";
import WorkersFormSection from "@/components/users/workers-form-section";
import {useToast} from "@/hooks/use-toast";
import {cn} from "@/lib/utils";
import {OPTIONS, UserFormData, userValidationSchema} from "@/utils/validation-schemas";
import {yupResolver} from "@hookform/resolvers/yup";
import {CalendarIcon, PlusIcon} from "@radix-ui/react-icons";
import {format, subDays} from "date-fns";
import {AnimatePresence, motion} from "framer-motion";
import * as React from "react";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";


export default function UserForm() {
    const {toast} = useToast()

    const [open, setOpen] = useState(false);

    const form = useForm<UserFormData>({
        resolver: yupResolver(userValidationSchema),
        defaultValues: {
            name: "",
            lastName: "",
            ci: "",
            dateOfBirth: new Date(),
            hasRuc: false,
            rucNumber: "",
            gender: "",
            hasFarm: false,
            farmHa: undefined,
            farmName: "",
            crops: [],
            hasWorkers: false,
            totalWorkers: undefined,
            menWorkers: undefined,
            womanWorkers: undefined,
            over18Workers: undefined,
            under18Workers: undefined,
            minorWorkersOccupation: "",
            hasPregnantWorkers: false,
            pregnantWorkers: undefined,
            pregnantWorkersOccupation: "",
        },
    });

    const {watch, setValue} = form;
    const hasRuc = watch("hasRuc");
    const hasFarm = watch("hasFarm");
    const hasWorkers = watch("hasWorkers");
    const under18Workers = watch("under18Workers");
    const hasPregnantWorkers = watch("hasPregnantWorkers");

    useEffect(() => {
        if (!hasRuc) {
            setValue("rucNumber", "");
        }
    }, [hasRuc, setValue]);

    useEffect(() => {
        if (!hasFarm) {
            setValue("farmHa", undefined);
            setValue("farmName", "");
        }
    }, [hasFarm, setValue]);

    useEffect(() => {
        if (!hasWorkers) {
            setValue("totalWorkers", undefined);
            setValue("menWorkers", undefined);
            setValue("womanWorkers", undefined);
            setValue("over18Workers", undefined);
            setValue("under18Workers", undefined);
            setValue("minorWorkersOccupation", "");
            setValue("hasPregnantWorkers", false);
            setValue("pregnantWorkers", undefined);
            setValue("pregnantWorkersOccupation", "");
        }
    }, [hasWorkers, setValue]);

    useEffect(() => {
        if (!((under18Workers || 0) > 0)) {
            setValue("minorWorkersOccupation", "");
        }
    }, [under18Workers, setValue]);

    useEffect(() => {
        if (!hasPregnantWorkers) {
            setValue("pregnantWorkers", undefined);
            setValue("pregnantWorkersOccupation", "");
        }
    }, [hasPregnantWorkers, setValue]);

    const onSubmit = async (data: UserFormData) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                toast({
                    title: "Error",
                    description: "Failed to save the user data",
                    type: "error",
                });
            }

            await response.json();

            toast({
                title: "Scheduled: Catch up",
                description: "User saved successfully",
            })

            form.reset();
            setValue("crops", []);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 items-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Christian" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Chunga" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ci"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Identity Card</FormLabel>
                                <FormControl>
                                    <Input placeholder="0987654321" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Select
                                            onValueChange={(value) =>
                                                setValue("dateOfBirth", subDays(new Date(), Number(value)))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="0">Today</SelectItem>
                                                <SelectItem value="7300">20 years ago</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="rounded-md border">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />

                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your gender"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="crops"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Crops</FormLabel>
                                <FormControl>
                                    <MultipleSelector
                                        onChange={(value) => {
                                            field.onChange(value.map((option) => option.value));
                                        }}
                                        defaultOptions={OPTIONS}
                                        placeholder="Select crops..."
                                        emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                No crops selected
                                            </p>
                                        }
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <FormField
                        control={form.control}
                        name="hasRuc"
                        render={({field}) => (
                            <FormItem className="space-x-4">
                                <FormLabel>Do you have RUC?</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <AnimatePresence>
                        {hasRuc && (
                            <motion.div
                                key="ruc-number"
                                initial={{opacity: 0, height: 0}}
                                animate={{opacity: 1, height: "auto"}}
                                exit={{opacity: 0, height: 0}}
                                className="overflow-hidden"
                            >
                                <FormField
                                    control={form.control}
                                    name="rucNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>RUC Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="0987654321001" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <FormField
                    control={form.control}
                    name="hasFarm"
                    render={({field}) => (
                        <FormItem className="space-x-4">
                            <FormLabel>¿Do you have a farm?</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <AnimatePresence>
                    {hasFarm && (
                        <motion.div
                            key="farm-section"
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: "auto"}}
                            exit={{opacity: 0, height: 0}}
                            className="overflow-hidden"
                        >
                            <FarmFormSection form={form}/>
                        </motion.div>
                    )}
                </AnimatePresence>

                <FormField
                    control={form.control}
                    name="hasWorkers"
                    render={({field}) => (
                        <FormItem className="space-x-4">
                            <FormLabel>Do you have workers?</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <AnimatePresence>
                    {hasWorkers && (
                        <motion.div
                            key="workers-section"
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: "auto"}}
                            exit={{opacity: 0, height: 0}}
                            className="overflow-hidden"
                        >
                            <WorkersFormSection form={form}/>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button variant="outline" className="flex gap-4 items-center" type="button"
                        onClick={() => setOpen(true)}>
                    <PlusIcon className="h-4 w-4"/>
                    <span className="text-sm">Add family member</span>
                </Button>

                <FamilyMemberList form={form}/>

                <Button className="mt-8" type="submit" variant="outline">Save</Button>
            </form>
            <FamilyMemberDialog open={open} setOpen={setOpen} form={form}/>
        </Form>
    );
}

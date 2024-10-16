"use client"

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import FarmFormSection from "@/components/users/farm-form-section";
import WorkersFormSection from "@/components/users/workers-form-section";
import {UserFormData, userValidationSchema} from "@/utils/validation-schemas";
import {yupResolver} from "@hookform/resolvers/yup";
import {AnimatePresence, motion} from "framer-motion";
import {useForm} from "react-hook-form";


export default function UserForm() {
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

    const {watch} = form;
    const hasRuc = watch("hasRuc");
    const hasFarm = watch("hasFarm");
    const hasWorkers = watch("hasWorkers");

    const onSubmit = (data: UserFormData) => {
        console.log(data);
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

                    {/*<FormField*/}
                    {/*    control={form.control}*/}
                    {/*    name="dateOfBirth"*/}
                    {/*    render={({field}) => (*/}
                    {/*        <FormItem>*/}
                    {/*            <FormLabel>Fecha de Nacimiento</FormLabel>*/}
                    {/*            <FormControl>*/}
                    {/*                <Input type="date" {...field} />*/}
                    {/*            </FormControl>*/}
                    {/*            <FormMessage/>*/}
                    {/*        </FormItem>*/}
                    {/*    )}*/}
                    {/*/>*/}

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


                    {/*<FormField*/}
                    {/*    control={form.control}*/}
                    {/*    name="crops"*/}
                    {/*    render={({field}) => (*/}
                    {/*        <FormItem>*/}
                    {/*            <FormLabel>Cultivos</FormLabel>*/}
                    {/*            <FormControl>*/}
                    {/*                <Input placeholder="Ingresa los cultivos (separados por comas)" {...field} />*/}
                    {/*            </FormControl>*/}
                    {/*            <FormMessage/>*/}
                    {/*        </FormItem>*/}
                    {/*    )}*/}
                    {/*/>*/}


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

                <Button className="mt-8" type="submit" variant="outline">Save</Button>
            </form>
        </Form>
    );
}

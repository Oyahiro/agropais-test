"use client"

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {UserFormData} from "@/utils/validation-schemas";
import {AnimatePresence, motion} from "framer-motion";
import {UseFormReturn} from "react-hook-form";

interface props {
    form: UseFormReturn<UserFormData>;
}

export default function WorkersFormSection({form}: props) {
    const {watch} = form;
    const under18Workers = watch("under18Workers");
    const hasPregnantWorkers = watch("hasPregnantWorkers");
    const pregnantWorkers = watch("pregnantWorkers");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <FormField
                control={form.control}
                name="totalWorkers"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Quantity of workers</FormLabel>
                        <FormControl>
                            <Input min={0} type="number" placeholder="Quantity of workers" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="menWorkers"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Quantity of men workers</FormLabel>
                        <FormControl>
                            <Input min={0} type="number" placeholder="Quantity of men workers" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="womanWorkers"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Quantity of women workers</FormLabel>
                        <FormControl>
                            <Input min={0} type="number" placeholder="Quantity of women workers" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="over18Workers"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Quantity of over 18 workers</FormLabel>
                        <FormControl>
                            <Input min={0} type="number" placeholder="Quantity of over 18 workers" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="under18Workers"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Quantity of under 18 workers</FormLabel>
                        <FormControl>
                            <Input min={0} type="number" placeholder="Quantity of under 18 workers" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <AnimatePresence>
                {(under18Workers || 0) > 0 && (
                    <motion.div
                        key="minor-workers-occupation"
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="overflow-hidden"
                    >
                        <FormField
                            control={form.control}
                            name="minorWorkersOccupation"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Occupation of the workers under 18</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Occupation of the workers under 18" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </motion.div>
                )}
            </AnimatePresence>


            <FormField
                control={form.control}
                name="hasPregnantWorkers"
                render={({field}) => (
                    <FormItem className="space-x-4">
                        <FormLabel>Do you have pregnant workers?</FormLabel>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <AnimatePresence>
                {hasPregnantWorkers && (
                    <motion.div
                        key="pregnant-workers"
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="overflow-hidden"
                    >
                        <FormField
                            control={form.control}
                            name="pregnantWorkers"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Quantity of pregnant workers</FormLabel>
                                    <FormControl>
                                        <Input min={0} type="number"
                                               placeholder="Quantity of pregnant workers" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {(pregnantWorkers || 0) > 0 && (
                    <motion.div
                        key="pregnant-workers-occupation"
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="overflow-hidden"
                    >
                        <FormField
                            control={form.control}
                            name="pregnantWorkersOccupation"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Occupation of the pregnant workers</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Occupation of the pregnant workers" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </motion.div>)}
            </AnimatePresence>

        </div>
    );
}

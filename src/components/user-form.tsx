import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    lastName: yup.string().required('El apellido es obligatorio'),
    ci: yup
        .string()
        .required('La cédula de identidad es obligatoria')
        .matches(/^\d{10}$/, 'La cédula de identidad debe tener 10 dígitos'),
    dateOfBirth: yup
        .date()
        .required('La fecha de nacimiento es obligatoria')
        .test('is-18', 'Debe ser mayor de 18 años', (value) => {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            return age > 18 || (age === 18 && m >= 0);
        }),
    hasRuc: yup.boolean().required('Debe indicar si tiene RUC'),
    rucNumber: yup
        .string()
        .when('hasRuc', {
            is: true,
            then: (schema) =>
                schema
                    .required('El número de RUC es obligatorio')
                    .matches(/^\d{13}$/, 'El RUC debe tener 13 dígitos'),
            otherwise: (schema) => schema.notRequired(),
        }),
    gender: yup.string().required('El género es obligatorio'),
    hasFarm: yup.boolean().required('Debe indicar si tiene finca'),
    farmHa: yup
        .number()
        .when('hasFarm', {
            is: true,
            then: (schema) => schema.required('Las hectáreas de la finca son obligatorias'),
            otherwise: (schema) => schema.notRequired(),
        }),
    farmName: yup
        .string()
        .when('hasFarm', {
            is: true,
            then: (schema) => schema.required('El nombre de la finca es obligatorio'),
            otherwise: (schema) => schema.notRequired(),
        }),
    crops: yup
        .array()
        .of(yup.string())
        .when('hasFarm', {
            is: true,
            then: (schema) => schema.min(1, 'Debe ingresar al menos un cultivo'),
            otherwise: (schema) => schema.notRequired(),
        }),
    hasWorkers: yup.boolean().required('Debe indicar si tiene trabajadores'),
    totalWorkers: yup
        .number()
        .when('hasWorkers', {
            is: true,
            then: (schema) => schema.required('El número total de trabajadores es obligatorio'),
            otherwise: (schema) => schema.notRequired(),
        }),
    menWorkers: yup
        .number()
        .when('hasWorkers', {
            is: true,
            then: (schema) =>
                schema.test(
                    'sum-men-women',
                    'La suma de hombres y mujeres debe ser igual al total de trabajadores',
                    function (value) {
                        const {womanWorkers, totalWorkers} = this.parent;
                        return totalWorkers === (value || 0) + (womanWorkers || 0);
                    }
                ),
            otherwise: (schema) => schema.notRequired(),
        }),
    womanWorkers: yup
        .number()
        .when('hasWorkers', {
            is: true,
            then: (schema) =>
                schema.test(
                    'sum-men-women',
                    'La suma de hombres y mujeres debe ser igual al total de trabajadores',
                    function (value) {
                        const {menWorkers, totalWorkers} = this.parent;
                        return totalWorkers === (value || 0) + (menWorkers || 0);
                    }
                ),
            otherwise: (schema) => schema.notRequired(),
        }),
    over18Workers: yup
        .number()
        .when('hasWorkers', {
            is: true,
            then: (schema) =>
                schema.test(
                    'sum-over-under-18',
                    'La suma de mayores y menores de 18 debe ser igual al total de trabajadores',
                    function (value) {
                        const {under18Workers, totalWorkers} = this.parent;
                        return totalWorkers === (value || 0) + (under18Workers || 0);
                    }
                ),
            otherwise: (schema) => schema.notRequired(),
        }),
    under18Workers: yup
        .number()
        .when('hasWorkers', {
            is: true,
            then: (schema) =>
                schema.test(
                    'sum-over-under-18',
                    'La suma de mayores y menores de 18 debe ser igual al total de trabajadores',
                    function (value) {
                        const {over18Workers, totalWorkers} = this.parent;
                        return totalWorkers === (value || 0) + (over18Workers || 0);
                    }
                ),
            otherwise: (schema) => schema.notRequired(),
        }),
    minorWorkersOcuppacion: yup
        .string()
        .when('under18Workers', {
            is: (value: number) => value > 0,
            then: (schema) => schema.required('La ocupación de los trabajadores menores de edad es obligatoria'),
            otherwise: (schema) => schema.notRequired(),
        }),
    hasPregnandWorkers: yup.boolean().required('Debe indicar si tiene trabajadoras embarazadas'),
    pregnandWorkers: yup
        .number()
        .when('hasPregnandWorkers', {
            is: true,
            then: (schema) =>
                schema.test(
                    'pregnant-women',
                    'El número de trabajadoras embarazadas no puede ser mayor al número de mujeres trabajadoras',
                    function (value) {
                        const {womanWorkers} = this.parent;
                        return (value || 0) <= (womanWorkers || 0);
                    }
                ),
            otherwise: (schema) => schema.notRequired(),
        }),
    pregnandWorkersOcuppacion: yup
        .string()
        .when('pregnandWorkers', {
            is: (value: number) => value > 0,
            then: (schema) => schema.required('La ocupación de las trabajadoras embarazadas es obligatoria'),
            otherwise: (schema) => schema.notRequired(),
        }),
});

type FormData = yup.InferType<typeof validationSchema>;

export function UserForm() {
    const form = useForm<FormData>({
        resolver: yupResolver(validationSchema),
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
            minorWorkersOcuppacion: "",
            hasPregnandWorkers: false,
            pregnandWorkers: undefined,
            pregnandWorkersOcuppacion: "",
        },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa tu nombre" {...field} />
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
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa tu apellido" {...field} />
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
                            <FormLabel>Cédula de Identidad</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa tu CI" {...field} />
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
                    name="hasRuc"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>¿Tiene RUC?</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rucNumber"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Número de RUC</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa tu RUC" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Género</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona tu género"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Masculino</SelectItem>
                                        <SelectItem value="female">Femenino</SelectItem>
                                        <SelectItem value="other">Otro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hasFarm"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>¿Tiene finca?</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="farmHa"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Hectáreas de la finca</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ingresa las hectáreas de la finca" {...field} />
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
                            <FormLabel>Nombre de la finca</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa el nombre de la finca" {...field} />
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

                <FormField
                    control={form.control}
                    name="hasWorkers"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>¿Tiene trabajadores?</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="totalWorkers"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Número total de trabajadores</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Número total de trabajadores" {...field} />
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
                            <FormLabel>Número de trabajadores hombres</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Número de trabajadores hombres" {...field} />
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
                            <FormLabel>Número de trabajadoras mujeres</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Número de trabajadoras mujeres" {...field} />
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
                            <FormLabel>Número de trabajadores mayores de 18 años</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Número de trabajadores mayores de 18" {...field} />
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
                            <FormLabel>Número de trabajadores menores de 18 años</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Número de trabajadores menores de 18" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="minorWorkersOcuppacion"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Ocupación de los trabajadores menores de edad</FormLabel>
                            <FormControl>
                                <Input placeholder="Ocupación de los menores de edad" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hasPregnandWorkers"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>¿Tiene trabajadoras embarazadas?</FormLabel>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="pregnandWorkers"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Número de trabajadoras embarazadas</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Número de trabajadoras embarazadas" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="pregnandWorkersOcuppacion"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Ocupación de las trabajadoras embarazadas</FormLabel>
                            <FormControl>
                                <Input placeholder="Ocupación de las embarazadas" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit" variant="outline">Guardar</Button>
            </form>
        </Form>
    );
}

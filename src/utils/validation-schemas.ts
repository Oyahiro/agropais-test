import * as yup from "yup";

export const OPTIONS = [
    {value: 'apple', label: 'Apple'},
    {value: 'banana', label: 'Banana'},
    {value: 'orange', label: 'Orange'},
    {value: 'grape', label: 'Grape'},
    {value: 'strawberry', label: 'Strawberry'},
];

export const familyMemberSchema = yup.object().shape({
    name: yup.string().required("The family member's name is obligatory"),
    lastName: yup.string().required("The family member's last name is obligatory"),
    ci: yup
        .string()
        .required("The family member's identity card is obligatory")
        .matches(/^\d{10}$/, "The identity card must have 10 digits"),
});

export const userValidationSchema = yup.object().shape({
    name: yup.string().required('The name is obligatory'),
    lastName: yup.string().required('The last name is obligatory'),
    ci: yup
        .string()
        .required('The identity card is obligatory')
        .matches(/^\d{10}$/, 'The identity card must have 10 digits'),
    dateOfBirth: yup
        .date()
        .required('The date of birth is obligatory')
        .test('is-18', 'You must be older than 18 years', (value) => {
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            return age > 18 || (age === 18 && m >= 0);
        }),
    hasRuc: yup.boolean().required('You must indicate if you have RUC'),
    rucNumber: yup
        .string()
        .when('hasRuc', {
            is: true,
            then: (schema) =>
                schema
                    .required('The RUC number is obligatory')
                    .matches(/^\d{13}$/, 'The RUC must have 13 digits'),
            otherwise: (schema) => schema.notRequired(),
        }),
    gender: yup.string().required('The gender is obligatory'),
    hasFarm: yup.boolean().required('You must indicate if you have a farm'),
    farmHa: yup
        .number()
        .when('hasFarm', {
            is: true,
            then: (schema) => schema.required('The hectares of the farm are obligatory'),
            otherwise: (schema) => schema.notRequired(),
        }),
    farmName: yup
        .string()
        .when('hasFarm', {
            is: true,
            then: (schema) => schema.required('The name of the farm is obligatory'),
            otherwise: (schema) => schema.notRequired(),
        }),
    crops: yup
        .array()
        .of(yup.string())
        .when('hasFarm', {
            is: true,
            then: (schema) => schema.min(1, 'You must enter at least one crop'),
            otherwise: (schema) => schema.notRequired(),
        }),
    hasWorkers: yup.boolean().required('You must indicate if you have workers'),
    totalWorkers: yup
        .number()
        .when('hasWorkers', {
            is: true,
            then: (schema) => schema.required('The total number of workers is obligatory'),
            otherwise: (schema) => schema.notRequired(),
        }),
    menWorkers: yup
        .number()
        .when('hasWorkers', {
            is: true,
            then: (schema) =>
                schema.test(
                    'sum-men-women',
                    'The sum of men and women must be equal to the total number of workers',
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
                    'The sum of men and women must be equal to the total number of workers',
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
                    'The sum of over 18 and under 18 must be equal to the total number of workers',
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
                    'The sum of over 18 and under 18 must be equal to the total number of workers',
                    function (value) {
                        const {over18Workers, totalWorkers} = this.parent;
                        return totalWorkers === (value || 0) + (over18Workers || 0);
                    }
                ),
            otherwise: (schema) => schema.notRequired(),
        }),
    minorWorkersOccupation: yup
        .string()
        .when('under18Workers', {
            is: (value: number) => value > 0,
            then: (schema) => schema.required('The occupation of the minor workers is obligatory'),
            otherwise: (schema) => schema.notRequired(),
        }),
    hasPregnantWorkers: yup.boolean().required('Debe indicar si tiene trabajadoras embarazadas'),
    pregnantWorkers: yup
        .number()
        .when('hasPregnantWorkers', {
            is: true,
            then: (schema) =>
                schema.test(
                    'pregnant-women',
                    'The number of pregnant workers cannot be greater than the number of women workers',
                    function (value) {
                        const {womanWorkers} = this.parent;
                        return (value || 0) <= (womanWorkers || 0);
                    }
                ),
            otherwise: (schema) => schema.notRequired(),
        }),
    pregnantWorkersOccupation: yup
        .string()
        .when('pregnantWorkers', {
            is: (value: number) => value > 0,
            then: (schema) => schema.required('The occupation of the pregnant workers is obligatory'),
            otherwise: (schema) => schema.notRequired(),
        }),
    family: yup
        .array()
        .of(familyMemberSchema)
        .min(1, 'You must provide at least one family member')
        .required('The family information is obligatory'),
});

export type UserFormData = yup.InferType<typeof userValidationSchema>;
export type FamilyMemberFormData = yup.InferType<typeof familyMemberSchema>;

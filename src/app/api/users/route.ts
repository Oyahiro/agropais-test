import {NextResponse} from 'next/server';

const users = [
    {
        id: 1,
        name: "Juan",
        lastName: "Pérez",
        ci: "1234567890",
        dateOfBirth: "1990-01-01",
        hasRuc: true,
        rucNumber: "1234567890123",
        gender: "male",
        hasFarm: true,
        farmHa: 2.4,
        farmName: "Finca Los Pinos",
        crops: ["Maíz", "Trigo"],
        hasWorkers: true,
        totalWorkers: 5,
        menWorkers: 3,
        womanWorkers: 2,
        over18Workers: 4,
        under18Workers: 1,
        minorWorkersOcuppacion: "Cosecha",
        hasPregnandWorkers: false,
        pregnandWorkers: 0,
        pregnandWorkersOcuppacion: ""
    },
    {
        id: 2,
        name: "Ana",
        lastName: "Gómez",
        ci: "0987654321",
        dateOfBirth: "1985-05-15",
        hasRuc: false,
        rucNumber: "",
        gender: "female",
        hasFarm: false,
        farmHa: 0,
        farmName: "",
        crops: [],
        hasWorkers: false,
        totalWorkers: 0,
        menWorkers: 0,
        womanWorkers: 0,
        over18Workers: 0,
        under18Workers: 0,
        minorWorkersOcuppacion: "",
        hasPregnandWorkers: false,
        pregnandWorkers: 0,
        pregnandWorkersOcuppacion: ""
    }
];

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    // Lógica para crear un nuevo usuario
    const body = await request.json();
    // Supongamos que guardas el usuario y devuelves el objeto creado
    const newUser = {id: 3, ...body};
    return NextResponse.json(newUser, {status: 201});
}



interface SeedRole {
    name: string;
}

interface SeedData {
    role: SeedRole[]
}

export const initialData: SeedData = {
    
    role: [
        {
             name: 'CLIENT'
        },
        {
            name: 'EMPLOYEE'
        }
    ]
}
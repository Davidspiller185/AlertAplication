import z from "zod"



export  const ValidPost = z.object({
    displayName: z.string().min(5),
    description: z.string().min(10),
    priority: z.enum(['Low','Medium','High','Critical']),
    arena: z.enum(['North','South','Center']),
    status: z.enum(['Active', 'Handled']),
    lon: z.number(),
    lat: z.number()

})

export const  ValidPut = z.object({
    displayName: z.string().min(5).optional(),
    description: z.string().min(10).optional(),
    priority: z.enum(['Low','Medium','High','Critical']).optional(),
    arena: z.enum(['North','South','Center']).optional(),
    status: z.enum(['Active', 'Handled']).optional(),
    lon: z.number().optional(),
    lat: z.number().optional()
})
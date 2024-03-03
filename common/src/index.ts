import z from "zod"

export const signupInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
})

export type signupInput = z.infer<typeof signupInput>


export const signinInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
})

export type signinInput = z.infer<typeof signinInput>


export const createBlogINput = z.object({
    title: z.string(),
    content : z.string()
})

export type createBlogINput = z.infer <typeof createBlogINput>

export const updateBlogINput = z.object({
    title: z.string(),
    content : z.string(),
    id : z.string()
})

export type updateBlogINput = z.infer <typeof updateBlogINput>
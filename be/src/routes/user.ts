import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@ssk2003/medium-common";
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    console.log("success",success);
    if(!success){
        c.status(411);
        c.json({"msg":"incorrect inputs"})
    }

    try {
        const user = await prisma.user.create({
            data: {
                name : body.name,
                email: body.email,
                password: body.password,
            },
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)

        return c.json({
            jwt: token
        })
    } catch (error) {
        return c.json({
            message: "User already exsists"
        })
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        c.json({"msg":"incorrect inputs"})
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})

// userRouter.get("/sasa", (c)=>{
//     return c.json({
//         msg : "userRouyer"
//     })
// })

// userRouter.get("/", (c)=>{
//     return c.json({
//         msg : "userRouyer"
//     })
// })

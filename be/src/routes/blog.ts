import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}, Variables: {
		userId: string;
	}
}>();

blogRouter.use('/*', async (c, next) => {
    try {
        
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const jwt = c.req.header('Authorization');
        if (!jwt) {
            c.status(401);
            return c.json({ error: "Unauthorized: No token provided." });
        }
        
        const token = jwt.split(' ')[1];
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(401);
            return c.json({ error: "Unauthorized: Invalid token." });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        });

        if (!user) {
            c.status(404);
            return c.json({ error: "User not found." });
        }

        c.set('userId', user.id);
        await next();
    } catch (error) {
        
        console.error('Authentication error:', error);

        
        c.status(500);
        return c.json({ error: "An internal server error occurred." });
    }
});


blogRouter.post('/create', async (c) => {
	console.log("reached creating blog");
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id,
		post: post
	});
});

blogRouter.get('bulk', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());
		const posts = await prisma.post.findMany({
			where:{
				published: true
			},
			select: {
				id: true,
				title: true,
				content: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});

		return c.json(posts);
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		return c.json({ error: 'Internal server error' }, 500);
	}
});

blogRouter.post('userblogs', async (c) => {
	try {
		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());
		const userId = c.get('userId');
		const body = await c.req.json();
		const posts = await prisma.post.findMany({
			where:{
				authorId:userId,
				published: body.published
			},
			select: {
				id: true,
				title: true,
				content: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});

		return c.json(posts);
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		return c.json({ error: 'Internal server error' }, 500);
	}
});


blogRouter.put('/publishblog', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	try {
		const updated = await prisma.post.update({
			where: {
				id: body.id,
				authorId: userId
			},
			data: {
				published: true
			}
		});

		return c.json(updated);
	} catch (error) {
		return c.json(error);
	}
});

blogRouter.get('/:id', async (c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const id = c.req.param('id');
	const post = await prisma.post.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			title: true,
			content: true,
			author: {
				select: {
					name: true,
				},
			},
		}
	});

	return c.json(post);
});
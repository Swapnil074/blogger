import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
    Variables: {
      userId: any;
    };
  }>();

blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];   
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", response.id);
      await next();
    } else {
      return c.json({ error: "Unauthorized" }, 403);
    }
  } catch (error) {
    console.error(error);
    return c.json({ error: "Unauthorized" }, 403);
  }
});

blogRouter.get('/bulk', async (c) => {
  
    const datasourceUrl = c.env.DATABASE_URL;
    const prisma = new PrismaClient({
      datasourceUrl,
    }).$extends(withAccelerate());
  
    try {
      const posts = await prisma.post.findMany();
      return c.json(posts); 
    } catch (error) {
      return c.json({ error: 'Failed to fetch posts' }, 500);
    }
  });

blogRouter.post('/write', async (c) => {


    const userId = c.get('userId');
    console.log(userId)
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
    try {
      const post = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: userId,
        },
      });
      return c.json({ id: post.id });
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Post creation failed' }, 500);
    }
  });

blogRouter.put("/write", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.post.update({
    where: {
      authorId: userId,
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("blog updated");
});
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return c.json(post);
});



  

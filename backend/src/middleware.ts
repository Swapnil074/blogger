import { sign,verify } from 'hono/jwt';


export const initMiddleware=async(app:any)=> {
    app.use("/*", async (c:any, next:any) => {
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
      })
    }
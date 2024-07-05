import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string,
	}
}>();

app.post('/api/v1/user/signup', async (c) => {

const prisma = new PrismaClient({
  datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate())

const body=await c.req.json()
try{
  const user=await prisma.user.create({
    data:{
      email:body.email,
      password:body.password
    }
  })
  const jwt=await sign({id:user.id}, c.env.JWT_SECRET)
  return c.json({jwt})
}catch(e){
  return c.status(403)
}
})
app.post('/api/v1/user/signin', (c) => {
  return c.text('signin route')
})
app.post('/api/v1/blog', (c) => {
  return c.text('blog route')
})
app.put('/api/v1/blog', (c) => {
  return c.text('blog put route')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('get blog by id route')
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('get all blogs route')
})

export default app

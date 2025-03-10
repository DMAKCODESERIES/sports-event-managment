import app from "./app.js"
import connectDB from "./config/server.js"


connectDB
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))



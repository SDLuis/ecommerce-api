import app from './libs/middlewares'
import db from './models/db.model'

/* eslint-disable */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT} in development mode
Press CTRL-C to stop`)
db.sequelize
.authenticate()
.then(async () => {
  console.log("database connected");
})
.catch((e: any) => {
  console.log(e.message);
});
})

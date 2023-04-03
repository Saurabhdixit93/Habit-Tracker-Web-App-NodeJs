// requiring mongoose
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

async function main() {
  let conn =  await mongoose.connect(process.env.MONGO_URL ||'mongodb://127.0.0.1:27017/habbit_tracker');
  console.log(`Yup ! MongoDB connected Successfully: ${conn.connection.host}`);
}

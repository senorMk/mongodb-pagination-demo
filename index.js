import app from './app.js';
import Mongoose from 'mongoose';
import User from './model.js';

const port = 3010;

(async () => {
  try {
    let url = process.env.MONGO_URL;

    await Mongoose.connect(url);

    console.log(`Connected to MongoDB at: ${url}`);
  } catch (err) {
    console.log(`${err}`);
    console.log(`Could not connect to MongoDB at: ${url}`);
  }
})();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

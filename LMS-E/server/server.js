
import app from "./app.js";
import connectionToDB from "./config/dbConnection.js";


const PORT = process.env.PORT || 5000;

connectionToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

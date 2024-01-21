import express from "express"
import connectDB from "./db/db_connection.js"; 
import cors from 'cors';
const PORT = process.env.PORT || 5000; //see below
const server = express();

server.use(cors());



connectDB()
    .then(() => {
      server.use(express.json());
      server.use(express.urlencoded({ extended: true }));
        // // Add the POST route for form submissions
        // app.post('/api/submit-form', submissionController.submitForm);
       
        server.get("/api/hello", (req, res) => {
          res.status(200).send("Hello vijay");
          console.log(res);
        });

        server.listen(PORT, () => console.log(`listening on port ${PORT}`));
    })
    .catch((error) => {
        console.error('MONGODB connection failed!!!', error);
    });


 






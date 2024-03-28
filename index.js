const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hotelRoutes = require('./routes/hotel.js'); 
const authRouter = require('./controllers/auth.js');

const tourController=require('./controllers/tour.js')

const contactUs=require('./controllers/contactUs.js')
const cors = require('cors');
const port = process.env.PORT || 4000;
const uri="mongodb+srv://ankita:ankita@cluster0.mbmdn0q.mongodb.net/hotelproject?retryWrites=true&w=majority"
// const uri = "mongodb+srv://rawat009111:fSQGtHMkkia3YhjZ@tours.qpddv9d.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri, { });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(cors());

app.use(express.json({ limit: '500mb' }));
app.use(bodyParser.json());
app.use(hotelRoutes);

app.post('/user/signup', authRouter.signup);
app.post('/user/login', authRouter.login);
app.post('/expert/signup', authRouter.signup);
app.post('/expert/login', authRouter.login);
app.post('/api/tours/:vendorId', tourController.createTour);
app.post('/api/contactus', contactUs.submitContactForm);
app.get('/api/allTours', tourController.getAllTours);
app.get('/api/tours/:vendorId', tourController.getToursForVendor);

app.get('/', (req, res) => { 
  res.send('Hello, Express with MongoDB!');
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on port ${port}`);
});
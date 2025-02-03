require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose')
const googleAuthRoutes = require('./routes/googleAuthRoutes');
const mobileAuthRoutes = require('./routes/mobileAuthRoutes');
const driverRoutes = require('./routes/driverRoutes');
const customerRoutes = require('./routes/customerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const goodsRoutes = require('./routes/goodsRoutes');
const chatRoutes = require('./routes/chatRoutes')
const app = express();
app.use(express.json())
app.use(
  cookieSession({
    name: 'session',
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
      origin: '*',
      credentials: true,
  })
);

app.use('/auth/google', googleAuthRoutes);
app.use('/auth/mobile', mobileAuthRoutes);
app.use('/driver', driverRoutes);
app.use('/customer', customerRoutes);
app.use('/admin', adminRoutes);
app.use('/order',orderRoutes);
app.use('/vehicle',vehicleRoutes);
app.use('/banner',bannerRoutes);
app.use('/goods',goodsRoutes);
app.use('/chat', chatRoutes)

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err))


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));

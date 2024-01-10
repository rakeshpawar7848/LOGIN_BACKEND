const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 5001;

app.use(cors());
//app.use(cors());

app.use(bodyParser.json());

const sequelize = new Sequelize('User_Login_db', 'root', 'Rakeshpawar@7848', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the models with the database
sequelize.sync().then(() => {
  console.log('Database synced');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
  
    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
  
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//const MONGO_URI = process.env.MONGODB_CONNECTION_STRING;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('User', userSchema);

const userSeed = async () => {
  try {
    await mongoose.connect(/*MONGO_URI*/'mongodb+srv://user0xdefault:SsXgFCxTSHDRKAz0@cluster0.ltqemr5.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = [
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password2',
      },
      {
        username: 'user3',
        email: 'user3@example.com',
        password: 'password3',
      },
      {
        username: 'user4',
        email: 'user4@example.com',
        password: 'password4',
      },
      {
        username: 'user5',
        email: 'user5@example.com',
        password: 'password5',
      },
      {
        username: 'user6',
        email: 'user6@example.com',
        password: 'password6',
      },
      {
        username: 'user7',
        email: 'user7@example.com',
        password: 'password7',
      },
      {
        username: 'user8',
        email: 'user8@example.com',
        password: 'password8',
      },
      {
        username: 'user9',
        email: 'user9@example.com',
        password: 'password9',
      },
      {
        username: 'user10',
        email: 'user10@example.com',
        password: 'password10',
      },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

userSeed();

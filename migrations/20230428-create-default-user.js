const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async up(db) {
    // Create default user
    const userCollection = db.collection('users');
    const defaultUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.hash('password', saltRounds),
    };
    await userCollection.insertOne(defaultUser);

    // Create working days for Monday to Friday
    const workdayCollection = db.collection('workdays');
    const workingDays = [
      { date: new Date('2023-05-01'), hours: '9:00 AM - 5:00 PM' }, // Monday
      { date: new Date('2023-05-02'), hours: '9:00 AM - 5:00 PM' }, // Tuesday
      { date: new Date('2023-05-03'), hours: '9:00 AM - 5:00 PM' }, // Wednesday
      { date: new Date('2023-05-04'), hours: '9:00 AM - 5:00 PM' }, // Thursday
      { date: new Date('2023-05-05'), hours: '9:00 AM - 5:00 PM' }, // Friday
    ];
    await workdayCollection.insertMany(workingDays);
  },

  async down(db) {
    // Remove default user
    const userCollection = db.collection('users');
    await userCollection.deleteOne({ email: 'johndoe@example.com' });

    // Remove working days for Monday to Friday
    const workdayCollection = db.collection('workdays');
    await workdayCollection.deleteMany({
      date: {
        $gte: new Date('2023-05-01'),
        $lte: new Date('2023-05-05'),
      },
    });
  },
};

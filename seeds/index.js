//require Models //! If using JSON files for seeds, otherwise require Models in the seed.js file

//require seeds (see MVC 07 instructor)

const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    // TODO: Add bulk creates for every 
    // await [ADD MODEL HERE].bulkCreate(dishData, {
    //   individualHooks: true,
    //   returning: true,
    // });
  
    process.exit(0);
  };
  
seedDatabase();
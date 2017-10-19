const db = require('../db');
const Sequelize = require('sequelize');


const User = db.define('User', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  work: {
    type: Sequelize.STRING
  },
  school: {
    type: Sequelize.STRING
  },
  interests: {
    type: Sequelize.ARRAY(Sequelize.STRING), 
    defaultValue: []
  }
}, {
  timestamps: false
});

const Image = db.define('Image', {
  img_urls: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
}, {
  timestamps: false
});

const Chat = db.define('Chat', {
  user_one: {
    type: Sequelize.INTEGER
  },
  user_two: {
    type: Sequelize.INTEGER
  },
  chat_entry: {
    type: Sequelize.TEXT
  }
});

const Match = db.define('Match', {
  likes: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  matches: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  blocks: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
}, {
  timestamps: false
});

const Icebreaker = db.define('Icebreaker', {
  question: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

User.hasMany(Image, { foreignKey: { name: 'user_id'}, onDelete: 'CASCADE' })
Image.belongsTo(User, { foreignKey: { name: 'user_id'}, onDelete: 'CASCADE' })

User.hasOne(Match, { foreignKey: { name: 'user_id'}, onDelete: 'CASCADE' })
Match.belongsTo(User, { foreignKey: { name: 'user_id'}, onDelete: 'CASCADE' })

// db.sync({force: true})

db.sync()
  .then(() => {
    console.log('User table created')
  })

  module.exports = {
    User, 
    Image,
    Chat,
    Match,
    Icebreaker
  }
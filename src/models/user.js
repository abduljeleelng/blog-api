'use strict';
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    */
    static associate(models) {
      User.hasMany(models.Post, {foreignKey:'userId', as: 'post', onDelete: 'CASCADE'})
      User.hasMany(models.Comment, {foreignKey:'userId', as: 'comment', onDelete: 'CASCADE'})
    }
  }

  User.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    //salt:DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async user => {
    try {
      //user.salt = uuidv4();
      const hashedPassword = await User.generatePasswordHash(user.password)
      user.password = hashedPassword
    } catch (error) {
      return res.status(404).json({error:"can not find the user", err:error})
    }
  });

  User.generatePasswordHash = async function(password) {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      return res.status(404).json({error:"can not find the user", err:error})
      
    }
  };

  User.validatePassword = async function(password, hash){
    try {
      return await bcrypt.compare(password, hash)
      //console.log({user, password, hash, dbHash:this.password, us:User.password, u:user.password})
    } catch (error) {
      return res.status(404).json({error:"can not find the user", err:error})
    }
  }

  User.findByLogin = async login => {
    try {
      console.log(login)
      let user = await User.findOne({
        where: { email: login },
      });
      if (!user) {
        user = await User.findOne({
          where: { email: login },
        });
      }
      return user;
    } catch (error) {
      return res.status(404).json({error:"can not find the user", err:error})
    }
  };
  return User;
};
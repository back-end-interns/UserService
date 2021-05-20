//refer to sequelize config
const db = require("../config/config")

exports.getData = async () => {
  try{  
    const result = await db.user.findAll();
    return result;
  }catch(err){
    return false;
  }
}

exports.createUser = async (body) => {
  try{  
    await db.user.create(body);
    return true;
  }catch(err){
    return err;
  }
}

exports.updateUser = async (body) => {
  try{  
    await db.user.update(body.values, body.condition);
    return true;
  }catch(err){
    return err;
  }
}

exports.deleteUser = async (body) => {
  try{  
     await db.user.destroy(body);
    return true;
  }catch(err){
    return false;
  }
}
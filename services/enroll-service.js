const db = require("../config/config")

exports.createEnrollment = async (body) => {
    try{  
        await db.enrollment.create(body);
        return true;
    }catch(err){
        return err;
    }
}

exports.getEnrollment = async () => {
    try{  
        const result = await db.enrollment.findAll();
        return result;
    }catch(err){
        return false;
    }
  }

exports.updateEnrollment = async (body) => {
    try{  
        await db.enrollment.update(body.values, body.condition);
        return true;
    }catch(err){
        return err;
    }
}

exports.deleteEnrollment = async (body) => {
    try{  
        await db.enrollment.destroy(body);
        return true;
    }catch(err){
        return false;
    }
}

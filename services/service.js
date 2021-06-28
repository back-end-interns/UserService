class CRUD {

  constructor (db){
    this.db = db;
  }

  create(body){ 
    try{  
      this.db.create(body);
      return true;
    }catch(err){
      return err;
    }
  }

  retrieve(){
    try{  
      const result = this.db.findAll();
      return result;
    }catch(err){
      return false;
    }
  }

  update(body){
    try{  
      this.db.update(body.values, body.condition);
      return true;
    }catch(err){
      return err;
    }
  }

  delete(body){
    try{  
      this.db.destroy(body);
      return true;
    }catch(err){
      return false;
    }
  }

  signIn(query){
    try{  
      const result = this.db.findOne(query);
      return result;
    }catch(err){
      return err;
    }
  }
}

module.exports = CRUD

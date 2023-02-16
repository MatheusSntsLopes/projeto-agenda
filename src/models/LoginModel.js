const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});


const LoginModel = mongoose.model('Login', LoginSchema);


class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async registrar(){
        this.validar();
        if(this.errors.length > 0) return;

        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

      try{

        this.user = await LoginModel.create(this.body);
      }
      catch(err){console.log(err); }
      
    }

   async userExists(){
     const user = await LoginModel.findOne({email: this.body.email});
     if(user){
        this.errors.push('Já existe um usuário cadastrado com esse email.');
     }
      
    }



    validar(){
        this.cleanUp();
        //checando email
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');

        //checando a senha que precisa ter entre 6 a 20 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 20) {
            this.errors.push('A senha precisa ter entre 6 a 20 caracteres.');
        }
        
    }

    cleanUp(){
        for(const key in this.body){
          if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
       };

        this.body = {
        email: this.body.email,
        password: this.body.password
       };
    }
}

module.exports = Login;
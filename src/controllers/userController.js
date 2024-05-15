var User = require('../models/userModel');
var nameCollection = 'users'
const jwt = require('jsonwebtoken')

exports.getUser = async function (req, res) {
    try {
        const result = await User.find();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.delete = async function(req, res){
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(203).send("Deletado!")
    }
    catch(err){
        res.status(500).send({ message: `${err.message} - falha ao deletar usuário.` })
    }
}

exports.update = async function(req, res){
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true })
        res.status(202).send("Atualizado!")
    }
    catch (err){
        res.status(500).send({ message: `${err.message} - falha ao atualizar usuário.` })
    }
}

exports.create = function (req, res) {
    try{
        let user = new User(
            {
                name: req.body.name,
                age: req.body.age,
                password: req.body.password
            }
        );
        user.save()
        (res.status(201).send(user.toJSON()))
    }
    catch(err){
        res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
    }
};

exports.details = async function (req, res) {
    try {
        const result = await User.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.login =  async function (req, res){
    //obtendo os dados para o login
    const {name, password} = req.body
    try{
        //verificar se o email existe no Mongodb
        let user = await User.findOne({name: name})
       //Se o array estiver vazio, é que o email não existe
       if (!user == null)
           return res.status(404).json({ //not found
            errors: [{
                value: `${name}`,
                msg: `O usuario ${name} não está cadastrado!`,
                param: 'name'
            }]
           }) 
       //Se o email existir, comparamos se a senha está correta
       const isMatch = await User.findOne({password: password})    
       if (isMatch == null)
          return res.status(403).json({ //forbidden
            errors: [{
                value: 'senha',
                msg: 'A senha informada está incorreta',
                param: 'senha'
            }]
          })
       //Iremos gerar o token JWT
       jwt.sign(
          { usuario: {name: user.name} },
          "$$F4t3cV0t0r4nt1m$$",
          { expiresIn: "24h" },
          (err, token) => {
            if (err) throw err
            res.status(200).json({
                access_token: token
            })
          }
       )   
    } catch (e){
        console.error(e)
    }

};
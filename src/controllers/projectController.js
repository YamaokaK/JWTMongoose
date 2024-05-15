var Project = require('../models/projectModel');

exports.getProject = async function (req, res) {
    try {
        const result = await Project.find().populate('assignedTo');
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.delete = async function(req, res){
    try{
        const poject = await Project.findByIdAndDelete(req.params.id)
        res.status(203).send("Deletado!")
    }
    catch(err){
        res.status(500).send({ message: `${err.message} - falha ao deletar usuário.` })
    }
}

exports.update = async function(req, res){
    try{
        const project = await Project.findByIdAndUpdate(req.params.id, {title: req.body.title, description: req.body.description}, { new: true })
        res.status(202).send("Atualizado!")
    }
    catch (err){
        res.status(500).send({ message: `${err.message} - falha ao atualizar usuário.` })
    }
}

exports.create = function (req, res) {
    try{
        let project = new Project(
        {
        title: req.body.title,
        description: req.body.description,
        assignedTo: req.body.assignedTo
        }
        );
        project.save()
        res.status(201).send(project.toJSON())
    }
    catch(err){
            res.status(500).send({message: `${err.message} - falha ao cadastrar projeto.`})
    }
    };

    exports.details = async function (req, res) {
        try {
            const result = await Project.findById(req.params.id);
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err);
        }
    };
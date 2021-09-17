const heroModel = require("../models/HeroModel.js");
exports.createAHero =(req,res)=>{



    const hero = new heroModel(req.body);
    hero.save()
    .then((newHero)=>{

        res.json({
            message :"The Hero Was successfully created and stored in the databaase",
            data : newHero
        })

    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })

};


exports.getHeroes =(req,res)=>{

    heroModel.find()
    .then(heroes=>{

        res.json({
            message : "A list of all the superheroes",
            data : heroes,
            totalHeroes : heroes.length
        })

    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })

};


exports.getASuperhero=(req,res)=>{


    heroModel.findById(req.params.id)
    .then(hero=>{

       
        if(hero)
        {
            res.json({

                message : `Hero with the id ${req.params.id}`,
                data : hero
            })
        }

        else
        {

            res.status(404).json({
                message : `There is no Hero in our database with the id ${req.params.id}`
            })
        }


    })

    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })


};


exports.updateASuperHero =(req,res)=>{


    heroModel.findByIdAndUpdate(req.params.id, req.body, {new :true})
    .then(hero=>{


        //if hero is not null

        if(hero)
        {
            res.json({
                message : `The Hero with the id ${req.params.id} was updated`,
                data : hero
            })

        }

        //hero contains null
        else
        {
            res.status(404).json({
                message : `Hero with ID ${req.params.id} was not found`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })


};

exports.deleteASuperHero=(req,res)=>{

    
    heroModel.findByIdAndRemove(req.params.id)
    .then(()=>{


        res.json({
            message: `The Hero with the ID ${req.params.id} was deleted`
        })


    })
    .catch(err=>{
        res.status(500).json({
            message :err
        })
    })

};
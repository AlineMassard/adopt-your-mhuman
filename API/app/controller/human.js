const dataMapper = require("../datamapper/human");


const humanController = {
  newHuman: async (req, res) => {
    const id = req.session.user.id;
    const AlreadyExists = await dataMapper.getMyhumans(id);
    const email = AlreadyExists.map(x => x.email);
    console.log(email);
    if(AlreadyExists) {
      res.send('You already have a human profile on this account')
    } else {
    //todo ajouter une condition avec une requête qui bloque la création d'un nouvel humain
    //todo si il y a un humain avec le account_id situé dans req.session.user.id !, "select * from human where account_id = req.session.user.id"

    console.log(req.session.user);
    try {
      const result = await dataMapper.createHuman(req.body.pseudo, req.body.image, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
                                                  req.body.description, req.body.age,
                                                  req.body.has_pets, req.body.has_kids, req.body.has_garden,
                                                  req.session.user.id); 
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
  },
  oneHuman: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.getHumanById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  allHumans: async (req, res) => {
    
    try {
      const result = await dataMapper.getHumans();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.updateHuman(req.body.pseudo, req.body.image, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
                                                  req.body.description, req.body.age,
                                                  req.body.has_pets, req.body.has_kids, req.body.has_garden,
                                                  id); // no "account_id" because the user that create the profil cannot change!
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.deleteHuman(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = humanController;
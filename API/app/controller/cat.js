const dataMapper = require("../datamapper/cat");


const catController = {
  newCat: async (req, res) => {
    
    try {
      const result = await dataMapper.createCat(req.body.pseudo, req.body.image, req.body.name,
                                                  req.body.description, req.body.race, req.body.age, req.body.sexe,
                                                  req.body.color,
                                                  req.body.likes_pets, req.body.likes_kids, req.body.needs_garden,
                                                   req.body.siblings_id,
                                                  req.body.account_id); // no "is_adopted" and no "owner_id" because the cat cannot be adopted already when just created.
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  oneCat: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.getCatById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  allCats: async (req, res) => {
    
    try {
      const result = await dataMapper.getCats();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.updateCat(req.body.pseudo, req.body.image, req.body.name,
                                                req.body.description, req.body.race, req.body.age, req.body.sexe,
                                                req.body.color,
                                                req.body.likes_pets, req.body.likes_kids, req.body.needs_garden,
                                                req.body.is_adopted, req.body.siblings_id, req.body.owner_id, // no "account_id" because the user that create the profil cannot change!
                                                  id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.deleteCat(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = catController;
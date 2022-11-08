const dataMapper = require("../datamapper/user");
// on récupère ce package afin de vérifier le format de l'email passé par l'utilisateur lors de l'inscription
const emailValidator = require('email-validator');
const jsonwebtoken = require('jsonwebtoken');
// on récupère bcrypt pour hasher le mdp
const bcrypt = require('bcrypt');

const userController = {
    async signupAction (req, res) {
        // on a recu des infos de l'utilisateur (le post de son formulaire)
        // chercher si l'utilisateur peut créer ce compte (via la méthode findOne )
        try {
            const searchedUser = await dataMapper.getOneUserByEmail(req.body.email);
            //console.log(searchedUser);
            const fakeObject = {};
            const check = searchedUser[0];
            const email = check || fakeObject;
            if (email.email == req.body.email) { //TODO j'ai ajouté ".email" à searchedUser ici -semble avoir réparé le pb
                throw new Error("Email already exists");
            }
            // vérifie que le format de l'email est valide ex: user@user.com
            if (!emailValidator.validate(req.body.email)) {
                throw new Error("Email format is not valid");
            }
            //vérifier que le mdp correspond au mdp à confirmer
            if (req.body.password !== req.body.passwordConfirm) {
                throw new Error("Password and confirmed Password does not match");
            }
            // encrypter le mdp
            // ici on encrypte le mdp via le module bcrypt, qui nous demande en premier paramètre le mdp et en deuxième paramètre le nombre de tour de hashage
            const encryptedMsg =  bcrypt.hashSync(req.body.password, 10);

            // Préparer une instance de user
            const newUser =  await dataMapper.createUser(req.body.email, encryptedMsg);
            // sauvegarder l'user
            const searchedUser1 = await dataMapper.getOneUserByEmail(req.body.email);
           // renvoyer l'utilisateur vers la page de connexion
           res.json(searchedUser1);

        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
    },
    async loginAction(req, res) {
        const jwtSecret = process.env.JWT_SECRET;
        // On tente de récupérer l'utilisateur
        try {
            const searchedUser = await dataMapper.getOneUserByEmail(req.body.email);
        
            if (!searchedUser) {
                throw new Error("Login does not work, email or password invalid");
            }
        // si on a un utilisateur, on vérifie que le mdp soit valide
        const pass = req.body.password; 
        //console.log(pass);
        const hash = searchedUser.map(x => x.password);
        const hash2 = hash[0];
        const sessionUser = searchedUser[0];
        //console.log(hash);
        //console.log(hash2);
        //console.log(hash3);
        console.log(sessionUser);
        console.log(sessionUser.id);
        const validPwd = await bcrypt.compare(pass, hash2);
        if (!validPwd) {
            throw new Error("Login does not work, email or password invalid");
        }
        
        //TODO JWT -------------------------------------
        if(sessionUser) {
        
        console.log(sessionUser);
        const jwtContent = { userId: sessionUser.id };
        const jwtOptions = { 
        algorithm: 'HS256', 
        expiresIn: '3h' 
        };
        console.log('<< 200', sessionUser.email);
        res.json({ 
            logged: true, 
            pseudo: sessionUser.email,
            token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
        });
        }
        else {
            console.log('<< 401 UNAUTHORIZED');
            res.sendStatus(401);
        }
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
    },
    disconnect(req, res) {
        // on va juste changer la valeur de la session
        req.session.user = false;
        res.send('succesfully disconnected')
        //console.log(req.session.user);
        // TODO ajouter ici le code qui va gérer l'action une fois que le user est déconnecté 
    }
};
module.exports = userController;
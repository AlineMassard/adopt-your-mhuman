const database = require('../../data/database');

const catDataMapper = {
    async createCat(pseudo, image, name, description, race, age, sexe, color, likes_pets, likes_kids,
        needs_garden, siblings_id, account_id) { 

        const query = {
            text: `INSERT INTO cat(pseudo, image, name, description, race, age, sexe, color, likes_pets, likes_kids,
                needs_garden, siblings_id, account_id) 
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
            values: [pseudo, image, name, description, race, age, sexe, color, likes_pets, likes_kids,
                needs_garden, siblings_id, account_id]
          }; // no "is_adopted" and no "owner_id" because the cat cannot be adopted already when just created.
        const result = await database.query(query);
        return result.rows;
    },
    async getCats() { 

        const query =`SELECT * FROM cat;`;
            
        const result = await database.query(query);
        return result.rows;
    },
    async getCatById(id) { 

        const query = {
            text: `SELECT * FROM cat WHERE id = $1`,
            values: [id]
          };
            
        const result = await database.query(query);
        return result.rows;
    },
    async updateCat(pseudo, image, name, description, race, age, sexe, color, likes_pets, likes_kids,
        needs_garden, is_adopted, siblings_id, owner_id, id) { 
            // no "account_id" because the user that created the profil cannot change!
        const query = {
            text: `UPDATE cat
            SET pseudo = $1, image = $2, name = $3, description = $4, race = $5, age = $6, sexe = $7, color = $8, likes_pets = $9, likes_kids = $10, needs_garden = $11, is_adopted = $12, siblings_id = $13, owner_id = $14
            WHERE id = $15`,
            values: [pseudo, image, name, description, race, age, sexe, color, likes_pets, likes_kids,
                needs_garden, is_adopted, siblings_id, owner_id, id]
          };
        const result = await database.query(query);
        return result.rows;
    },
    async deleteCat(id) { 

        const query = {
            text: `DELETE FROM cat WHERE id = $1`,
            values: [id]
          };
        const result = await database.query(query);
        return result.rows;
    }
}

module.exports = catDataMapper;
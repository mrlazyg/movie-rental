const GenreService = require('../services/GenreService');

class GenreController {
  static async getAllGenre(req, res, next) {
    try {
      const genres = await GenreService.getAllGenre();
      res.send(genres);
    } catch (err) {
      next(err);
    }
  }

  static async getGenre(req, res, next) {
    try {
      // console.log(req.headers);
      const { id } = req.params;
      if (id) {
        const genre = await GenreService.getGenre(id);
        return res.send(genre);
      }
      res.status(400).send('Please provide the genre Id');
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  }

  static async createGenre(req, res) {
    const { body } = req;
    if (body.name) {
      const genre = await GenreService.createGenre(body);
      return res.send(genre);
    }
    res.status(400).send('Please provide genre name');
  }

  static async updateGenre(req, res) {
    if (req.params.id && req.body) {
      const genre = await GenreService.updateGenre(req.params.id, req.body);
      return res.send(genre);
    }
    res.status(400).send('Please provide the required params');
  }

  static async deleteGenre(req, res) {
    if (req.params.id) {
      const genre = await GenreService.deleteGenre(req.params.id);
      return res.send(genre);
    }
    res.status(400).send('Please provide the genre id');
  }
}

module.exports = GenreController;

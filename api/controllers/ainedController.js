const ainedService = require('../services/ainedService');
const ainedController = {};


/**
 * Get all ained
 * GET - /ained
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of ained
 */
ainedController.getAined = (req, res) => {
  const ained = ainedService.getAined();
  res.status(200).json({
    ained : ained,
  });
};


/**
 * Get aine by aine id
 * GET - /ained/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and aine with specified id
 * Error: status 400 - Bad Request and error message
 */
ainedController.getAineById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const aine = ainedService.getAineById(id);
  if (aine) {
    res.status(200).json({
      aine: aine
    });
  } else {
    res.status(400).json({
      error: `Ei leitud ainet id-ga: ${id}`,
    });
  }
};


/**
 * Create new aine
 * POST - /aine
 * Required values: id, description
 * Optional values: none
 * Success: status 201 - Created and id of created aine
 * Error: status 400 - Bad Request and error message
 */
ainedController.createAine = (req, res) => {
    const description = req.body.description;
    if (description) {
      const aine = {
        id: ained.length + 1,
        description: description
      };
      const id = ainedService.createAine(aine);
    res.status(201).json({
      id,
    });
    } else {
      res.status(400).json({
        error: 'Puudub kirjeldus'
      });
    }
  };



/**
 * Delete aine
 * DELETE - /ained/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */


ainedController.deleteAine = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if aine exists
  const aine = ainedService.getAineById(id);
  if (aine) {
    const success = ainedService.deleteAine(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Aine kustutamisel tekkis viga.',
      });
    }
  } else {
    res.status(400).json({
      error: `Ei leitud ainet id-ga: ${id}`,
    });
  }
};

module.exports = ainedController;

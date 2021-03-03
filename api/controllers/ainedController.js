const ainedService = require('../services/ainedService');
const ainedController = {};


//Leia kõik ained

ainedController.getAined = (req, res) => {
  const ained = ainedService.getAined();
  res.status(200).json({
    ained,
  });
};


//Leia ained ID järgi
ainedController.getAineById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const aine = ainedService.getAineById(id);
  if (aine) {
    res.status(200).json({
      aine,
    });
  } else {
    res.status(400).json({
      error: `Ei leitud ainet id-ga: ${id}`,
    });
  }
};


// Lisa uus aine
ainedController.createAine = (req, res) => {
  const { description } = req.body;
  if (description) {
    const aine = {
      description,
    };
    const id = ainedService.createAine(aine);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Aine nimetus puudub',
    });
  }
};
// Muuda ainet
ainedController.changeAine = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description } = req.body;
  if (id && description) {
    const aine = ainedService.getAineById(id);
    if (aine) {
      const aineToChange = {
        id,
        description,
      };
      const success = ainedService.changeAine(aineToChange);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Midagi läks valesti',
        });
      }
    } else {
      res.status(400).json({
        error: `Ei leitud ainet id-ga : ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Id või kirjeldus puudub',
    });
  }
};

  
//Kustuta aine


ainedController.deleteAine = (req, res) => {
  const id = parseInt(req.params.id, 10);
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

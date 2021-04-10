const ainedService = require('../services/ainedService');
const ainedController = {};


//Leia kõik ained

ainedController.getAined = async (req, res) => {
  const ained = await ainedService.getAined();
  res.status(200).json({
    ained,
  });
};


//Leia ained ID järgi
ainedController.getAineById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const aine = await ainedService.getAineById(id);
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
ainedController.createAine = async (req, res) => {
  const {description, oppejoudID, ruumID, kursusID } = req.body;
  if (description && oppejoudID && ruumID && kursusID) {
    const aine = {
      description,
      oppejoudID,
      ruumID,
      kursusID
    };
    const id = await ainedService.createAine(aine);
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
ainedController.changeAine = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { description, oppejoudID, ruumID, kursusID } = req.body;
  if (id && (description || oppejoudID || ruumID || kursusID)) {
    const aine = await ainedService.getAineById(id);
    if (aine) {
      const aineToChange = {
        id,
        description,
        oppejoudID,
        ruumID,
        kursusID
      };
      const success = await ainedService.changeAine(aineToChange);
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


ainedController.deleteAine = async  (req, res) => {
  const id = parseInt(req.params.id, 10);
   const aine = await ainedService.getAineById(id);
  if (aine) {
    const success = await ainedService.deleteAine(id);
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

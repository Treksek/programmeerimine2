const kursusedService = require('../services/kursusedService');
const kursusedController = {};


kursusedController.getKursused = (req, res) => {
  const kursused = kursusedService.getKursused();
  res.status(200).json({
    kursused : kursused,
  });
};



kursusedController.getKursusById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const kursus = kursusedService.getKursusById(id);
  if (kursus) {
    res.status(200).json({
      kursus: kursus
    });
  } else {
    res.status(400).json({
      error: `Ei leitud kursust id-ga: ${id}`,
    });
  }
};
kursusedController.createKursus = (req, res) => {
  const { description } = req.body;
  if (description) {
    const kursus = {
      description,
    };
    const id = kursusedService.createKursus(kursus);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Kursuse nimetus puudub',
    });
  }
};



  kursusedController.changeKursus = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { description } = req.body;
    if (id && description) {
      const kursus = kursusedService.getKursusById(id);
      if (kursus) {
        const kursusToChange = {
          id,
          description,
        };
        const success = kursusedService.changeKursus(kursusToChange);
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
          error: `Ei leitud kursust id-ga : ${id}`,
        });
      }
    } else {
      res.status(400).json({
        error: 'Id või kirjeldus puudub',
      });
    }
  };



  kursusedController.deleteKursus = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const kursus = kursusedService.getKursusById(id);
  if (kursus) {
    const success = kursusedService.deleteKursus(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Kursuse kustutamisel tekkis viga.',
      });
    }
  } else {
    res.status(400).json({
      error: `Ei leitud kursust id-ga: ${id}`,
    });
  }
};

module.exports = kursusedController;

const ruumidService = require('../services/ruumidService');
const ruumidController = {};


ruumidController.getRuumid = (req, res) => {
  const ruumid = ruumidService.getRuumid();
  res.status(200).json({
    ruumid : ruumid,
  });
};



ruumidController.getRuumById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ruum = ruumidService.getRuumById(id);
  if (ruum) {
    res.status(200).json({
      ruum: ruum
    });
  } else {
    res.status(400).json({
      error: `Ei leitud ruumi id-ga: ${id}`,
    });
  }
};



ruumidController.createRuum = (req, res) => {
  const { description } = req.body;
  if (description) {
    const ruum = {
      description,
    };
    const id = ruumidService.createRuum(ruum);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Ruumi nimetus puudub',
    });
  }
};

  ruumidController.changeRuum = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { description } = req.body;
    if (id && description) {
      const ruum = ruumidService.getRuumById(id);
      if (ruum) {
        const ruumToChange = {
          id,
          description,
        };
        const success = ruumidService.changeRuum(ruumToChange);
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
          error: `Ei leitud ruumi id-ga : ${id}`,
        });
      }
    } else {
      res.status(400).json({
        error: 'Id või kirjeldus puudub',
      });
    }
  };





  ruumidController.deleteRuum = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ruum = ruumidService.getRuumById(id);
  if (ruum) {
    const success = ruumidService.deleteRuum(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Ruumi kustutamisel tekkis viga.',
      });
    }
  } else {
    res.status(400).json({
      error: `Ei leitud ruumi id-ga: ${id}`,
    });
  }
};

module.exports = ruumidController;

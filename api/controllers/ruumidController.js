const ruumidService = require('../services/ruumidService');
const ruumidController = {};


ruumidController.getRuumid = async (req, res) => {
  const ruumid = await ruumidService.getRuumid();
  res.status(200).json({
    ruumid : ruumid,
  });
};



ruumidController.getRuumById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ruum = await ruumidService.getRuumById(id);
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



ruumidController.createRuum = async (req, res) => {
  const { description } = req.body;
  if (description) {
    const ruum = {
      description,
    };
    const id = await ruumidService.createRuum(ruum);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Ruumi nimetus puudub',
    });
  }
};

  ruumidController.changeRuum = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { description } = req.body;
    if (id && description) {
      const ruum = await ruumidService.getRuumById(id);
      if (ruum) {
        const ruumToChange = {
          id,
          description,
        };
        const success = await ruumidService.changeRuum(ruumToChange);
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





  ruumidController.deleteRuum = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ruum = await ruumidService.getRuumById(id);
  if (ruum) {
    const success = await ruumidService.deleteRuum(id);
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

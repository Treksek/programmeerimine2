const oppejoudService = require('../services/oppejoudService');
const oppejoudController = {};


oppejoudController.getOppejoud = (req, res) => {
  const oppejoud = oppejoudService.getOppejoud();
  res.status(200).json({
    oppejoud : oppejoud,
  });
};



oppejoudController.getOpetajaById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const opetaja = oppejoudService.getOpetajaById(id);
  if (opetaja) {
    res.status(200).json({
        opetaja: opetaja
    });
  } else {
    res.status(400).json({
      error: `Ei leitud oppejoudu id-ga: ${id}`,
    });
  }
};



oppejoudController.createOpetaja = (req, res) => {
  const { description } = req.body;
  if (description) {
    const opetaja = {
      description,
    };
    const id = oppejoudService.createOpetaja(opetaja);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Õppejõu nimi puudub',
    });
  }
};

  oppejoudController.changeOpetaja = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { description } = req.body;
    if (id && description) {
      const opetaja = oppejoudService.getOpetajaById(id);
      if (opetaja) {
        const opetajaToChange = {
          id,
          description,
        };
        const success = oppejoudService.changeOpetaja(opetajaToChange);
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
          error: `Ei leitud Õppejõudu id-ga : ${id}`,
        });
      }
    } else {
      res.status(400).json({
        error: 'Id või kirjeldus puudub',
      });
    }
  };





  oppejoudController.deleteOpetaja = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const opetaja = oppejoudService.getOpetajaById(id);
  if (opetaja) {
    const success = oppejoudService.deleteOpetaja(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Õppejõu kustutamisel tekkis viga.',
      });
    }
  } else {
    res.status(400).json({
      error: `Ei leitud õppejõudu id-ga: ${id}`,
    });
  }
};

module.exports = oppejoudController;

const oppejoudService = require('../services/oppejoudService');
const oppejoudController = {};


oppejoudController.getOppejoud = async (req, res) => {
  const oppejoud = await oppejoudService.getOppejoud();
  res.status(200).json({
    oppejoud : oppejoud,
  });
};



oppejoudController.getOpetajaById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const opetaja = await oppejoudService.getOpetajaById(id);
  if (!opetaja) {
    return res.status(400).json({
      error: `Ei leitud oppejoudu id-ga: ${id}`,
    });
  } 
    return res.status(200).json({
        opetaja,
      });
   
};


oppejoudController.createOpetaja = async (req, res) => {
  const { description } = req.body;
  if (description) {
    const opetaja = {
      description,
    };
    const id = await oppejoudService.createOpetaja(opetaja);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Õppejõu nimi puudub',
    });
  }
};

  oppejoudController.changeOpetaja = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { description } = req.body;
    if (id && description) {
      const opetaja = await oppejoudService.getOpetajaById(id);
      if (opetaja) {
        const opetajaToChange = {
          id,
          description,
        };
        const success = await oppejoudService.changeOpetaja(opetajaToChange);
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





  oppejoudController.deleteOpetaja = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const opetaja = await oppejoudService.getOpetajaById(id);
  if (opetaja) {
    const success = await oppejoudService.deleteOpetaja(id);
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

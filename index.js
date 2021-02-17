const express = require('express');
const app =  express();

const port = 3001;

const ained = [
    {
        id: 1,
        description: 'programmeerimine'
    },
    {
        id: 2,
        description: 'multimeedia'
    },
    {
        id: 3,
        description: 'reklaamidisain'
    }
]
const oppejoud = [
    {
        id: 1,
        description: 'Martti Raavel'
    },
    {
        id: 2,
        description: 'Andrus Rinde'
    },
    {
        id: 3,
        description: 'Laura Hein'
    }
]
const kursused = [
    {
        id: 1,
        description: 'RIF1'
    },
    {
        id: 2,
        description: 'RIF2'
    },
    {
        id: 3,
        description: 'RIF3'
    }
]
const ruumid = [
    {
        id: 1,
        description: '203'
    },
    {
        id: 2,
        description: '205'
    },
    {
        id: 3,
        description: 'Zoom'
    }
]


app.use(express.json());

app.get('/ained', (req, res) => {
    res.status(200).json({
      ained: ained
    });
  });
  app.get('/oppejoud', (req, res) => {
    res.status(200).json({
      oppejoud: oppejoud
    });
  });
  app.get('/kursused', (req, res) => {
    res.status(200).json({
      kursused: kursused
    });
  });
  app.get('/ruumid', (req, res) => {
    res.status(200).json({
      ruumid: ruumid
    });
  });
  app.get('/ained/:id', (req, res) => {
    const key = req.query.key;
    const id = req.params.id;
    const aine = ained[id - 1];
    res.status(200).json({
      aine: aine
    });
  });
  app.get('/oppejoud/:id', (req, res) => {
    const key = req.query.key;
    const id = req.params.id;
    const opetaja = oppejoud[id - 1];
    res.status(200).json({
      opetaja: opetaja
    });
  });
  app.get('/kursused/:id', (req, res) => {
    const key = req.query.key;
    const id = req.params.id;
    const kursus = kursused[id - 1];
    res.status(200).json({
      kursus: kursus
    });
  });
  app.get('/ruumid/:id', (req, res) => {
    const key = req.query.key;
    const id = req.params.id;
    const ruum = ruumid[id - 1];
    res.status(200).json({
      ruum: ruum
    });
  });
  app.post('/ained', (req, res) => {
    const description = req.body.description;
    if (description) {
      const aine = {
        id: ained.length + 1,
        description: description
      };
      ained.push(aine);
      res.status(201).json({
        id: aine.id
      });
    } else {
      res.status(400).json({
        error: 'Description is missing'
      });
    }
  });
  app.post('/oppejoud', (req, res) => {
    const description = req.body.description;
    if (description) {
      const opetaja = {
        id: oppejoud.length + 1,
        description: description
      };
      oppejoud.push(opetaja);
      res.status(201).json({
        id: opetaja.id
      });
    } else {
      res.status(400).json({
        error: 'Description is missing'
      });
    }
  });
  app.post('/kursused', (req, res) => {
    const description = req.body.description;
    if (description) {
      const kursus = {
        id: kursused.length + 1,
        description: description
      };
      kursused.push(kursus);
      res.status(201).json({
        id: kursus.id
      });
    } else {
      res.status(400).json({
        error: 'Description is missing'
      });
    }
  });
  app.post('/ruumid', (req, res) => {
    const description = req.body.description;
    if (description) {
      const ruum = {
        id: ruumid.length + 1,
        description: description
      };
      ruumid.push(ruum);
      res.status(201).json({
        id: ruum.id
      });
    } else {
      res.status(400).json({
        error: 'Description is missing'
      });
    }
  });
  app.delete('/ained/:id', (req, res) => {
    const id = req.params.id;
    ained.splice(id - 1, 1);
    res.status(200).end();
  });
  app.delete('/oppejoud/:id', (req, res) => {
    const id = req.params.id;
    oppejoud.splice(id - 1, 1);
    res.status(200).end();
  });
  app.delete('/kursused/:id', (req, res) => {
    const id = req.params.id;
    kursused.splice(id - 1, 1);
    res.status(200).end();
  });
  app.delete('/ruumid/:id', (req, res) => {
    const id = req.params.id;
    ruumid.splice(id - 1, 1);
    res.status(200).end();
  });
  
app.patch('/ained/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    ained[id - 1].description = description;
    res.status(200).json({
      success: true
    });
  });
  
app.patch('/oppejoud/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    oppejoud[id - 1].description = description;
    res.status(200).json({
      success: true
    });
  });
  
app.patch('/kursused/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    kursused[id - 1].description = description;
    res.status(200).json({
      success: true
    });
  });
  
app.patch('/ruumid/:id', (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    ruumid[id - 1].description = description;
    res.status(200).json({
      success: true
    });
  });

app.listen(port, () => {
    console.log('Server is running on port:', port);
  })
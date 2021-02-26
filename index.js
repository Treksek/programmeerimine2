const express = require('express');
const config = require('./config');
const database = require('./database');


const app =  express();
const { port } = config || 4000;

const logger = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};

// Middleware for creating req.body in express app
app.use(express.json());

// Routes

// Logger middleware
app.use(logger);

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
    const id = parseInt(req.params.id);
    const aine = ained.find(aine => aine.id === id);
    if (aine) {
      res.status(200).json({
        aine: aine
      });
    } else {
      res.status(400).json({
        error: 'Ainet ei leitud'
      });
    }
  });
  app.get('/oppejoud/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const opetaja = oppejoud.find(opetaja => opetaja.id === id);
    if (opetaja) {
      res.status(200).json({
        opetaja: opetaja
      });
    } else {
      res.status(400).json({
        error: 'Õppejõudu ei leitud'
      });
    }
  });app.get('/kursused/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const kursus = kursused.find(kursus => kursus.id === id);
    if (kursus) {
      res.status(200).json({
        kursus: kursus
      });
    } else {
      res.status(400).json({
        error: 'Kursust ei leitud'
      });
    }
  });app.get('/ruumid/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ruum = ruumid.find(ruum => ruum.id === id);
    if (ruum) {
      res.status(200).json({
        ruum: ruum
      });
    } else {
      res.status(400).json({
        error: 'Ruumi ei leitud'
      });
    }
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
        error: 'Puudub kirjeldus'
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
        error: 'Puudub kirjeldus'
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
        error: 'Puudub kirjeldus'
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
        error: 'Puudub kirjeldus'
      });
    }
  });

  app.delete('/ained/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = ained.findIndex(aine => aine.id === id);
    if (index !== -1) {
      ained.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(400).json({
        error: `Ei leitud ainet id-ga: ${id}`
      });
    }
    
  });
  app.delete('/oppejoud/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = oppejoud.findIndex(opetaja => opetaja.id === id);
    if (index !== -1) {
      oppejoud.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(400).json({
        error: `Ei leitud õppejõudu id-ga: ${id}`
      });
    }
    
  });
  app.delete('/kursused/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = kursused.findIndex(kursus => kursus.id === id);
    if (index !== -1) {
      kursused.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(400).json({
        error: `Ei leitud kursust id-ga: ${id}`
      });
    }
    
  });
  app.delete('/ruumid/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = ruumid.findIndex(ruum => ruum.id === id);
    if (index !== -1) {
      ruumid.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(400).json({
        error: `Ei leitud ruumi id-ga: ${id}`
      });
    }
    
  });
  app.patch('/ained/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const index = ained.findIndex(aine => aine.id === id);
    if (index !== -1 && description) {
      ained[index].description = description;
      res.status(200).json({
        success: true
      });
    } else if (index === -1) {
      res.status(400).json({
        error: `Ei leitud ainet id-ga: ${id}`
      });
    } else {
      res.status(400).json({
        error: `Kirjeldus puudub`
      });
    }
  });
  app.patch('/oppejoud/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const index = oppejoud.findIndex(opetaja => opetaja.id === id);
    if (index !== -1 && description) {
      oppejoud[index].description = description;
      res.status(200).json({
        success: true
      });
    } else if (index === -1) {
      res.status(400).json({
        error: `Ei leitud õppejõudu id-ga: ${id}`
      });
    } else {
      res.status(400).json({
        error: `Kirjeldust ei leitud`
      });
    }
  });
  app.patch('/kursused/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const index = kursused.findIndex(kursus => kursus.id === id);
    if (index !== -1 && description) {
      kursused[index].description = description;
      res.status(200).json({
        success: true
      });
    } else if (index === -1) {
      res.status(400).json({
        error: `Ei leitud kursust id-ga: ${id}`
      });
    } else {
      res.status(400).json({
        error: `Kirjeldus puudub`
      });
    }
  });
  app.patch('/ruumid/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const index = ruumid.findIndex(ruum => ruum.id === id);
    if (index !== -1 && description) {
      ruumid[index].description = description;
      res.status(200).json({
        success: true
      });
    } else if (index === -1) {
      res.status(400).json({
        error: `Ei leitud ruumi id-ga: ${id}`
      });
    } else {
      res.status(400).json({
        error: `Kirjeldus puudub`
      });
    }

  });


app.listen(port, () => {
    console.log('Server is running on port:', port);
  })
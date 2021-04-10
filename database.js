const database = {
ained: [
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
],
oppejoud: [
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
],
kursused: [
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
],
ruumid: [
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
],
users: [
    {
      id: 1,
      firstName: 'Minni',
      lastName: 'Maalikas',
      email: 'minnike@tlu.ee',
      password: '$2b$10$7uypJL9kmGsZPRb5PROjWei01w5vqxM86cDCVECkHnckoiU6oxAH6', //'MaalikaMinni'
      role: 'User',
    },
    {
      id: 2,
      firstName: 'Katrin',
      lastName: 'Kadalipp',
      email: 'katkad@tlu.ee',
      password: '$2b$10$xu/Kqeurij9hn.5B7qM4KeXU73I6.VN6zRvigWnNeoapvUpR9N0qS', // 'KassKatusel',
      role: 'User',
    },
    {
      id: 3,
      firstName: 'Aadu',
      lastName: 'Ohakas',
      email: 'ahikas@tlu.ee',
      password: '$2b$10$yxHuiPIPG/026tpmWPXcOOCJ1hQSc5SHteNJq8jFnGd3L07B610xi', // 'A1B2C3D4',
      role: 'admin',
    },
  ],
};

module.exports = database;
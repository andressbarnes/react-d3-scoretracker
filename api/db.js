const faker = require('faker');

module.exports = () => {
  const data = { users: [] };
  // Create 1000 users
  for (let i = 0; i < 100; i++) {
    const randFirstName = faker.name.firstName();
    const randLastName = faker.name.lastName();
    const randomColor = faker.internet.color();
    const scores = {};
    for (let j = 0; j < 5; j++) {
      const key = 'score' + j;
      scores[key] = Math.floor(Math.random() * Math.floor(70) * j);
    }
    data.users.push({
      id: i,
      fName: randFirstName,
      lName: randLastName,
      scores: scores,
      color: randomColor
    });
  }
  return data;
};

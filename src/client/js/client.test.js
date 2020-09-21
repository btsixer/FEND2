// Import the js file to test
import { handleSubmit } from "./client"

test('The function exists', () => {
    expect(handleSubmit()).toBeDefined();
});

// Test the express server
const app = require('../../server/server.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})

beforeAll(done => {
  done()
})

it('gets the test endpoint', async done => {
  const response = await request.get('/test')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('pass!')
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  server.close()
  done()
})

// const houseForSale = {
//     bath: true,
//     bedrooms: 4,
//     kitchen: {
//       amenities: ['oven', 'stove', 'washer'],
//       area: 20,
//       wallColor: 'white',
//     },
//   };
//   const desiredHouse = {
//     bath: true,
//     kitchen: {
//       amenities: ['oven', 'stove', 'washer'],
//       wallColor: expect.stringMatching(/white|yellow/),
//     },
//   };
  
//   test('the house has my desired features', () => {
//     expect(houseForSale).toMatchObject(desiredHouse);
//   });
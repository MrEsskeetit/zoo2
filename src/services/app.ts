import express, { Application } from 'express';
import bodyParser from 'body-parser';
import animalsController from '../controllers/animalsController';

type Port = number | string;

const app: Application = express();
app.use(bodyParser.json());

app.get('/animals', animalsController.getAllAnimals);
app.get('/animals/id/:id', animalsController.getAnimalById);
app.get('/animals/endangered', animalsController.getEndangeredAnimals);
app.get('/animals/habitat/:habitat', animalsController.getAnimalsByHabitat);
app.get('/animals/species', animalsController.getAnimalsBySpecies);
app.post('/animals/addanimal', animalsController.addAnimal);
app.put('/animals/updateanimal/:id', animalsController.updateAnimal);
app.delete('/animals/deleteanimal/:id', animalsController.deleteAnimal);

const PORT: Port = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

export default app;
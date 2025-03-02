import { Request, Response } from 'express';
import animalsService from '../services/animalService';

// Typ dla zwierzęcia (jeśli jeszcze nie masz zdefiniowanego typu w projekcie)
interface Animal {
    id: string;
    name: string;
    species: string;
    habitat: string;
    endangered: boolean;
}

// Funkcja pobierająca wszystkie zwierzęta
const getAllAnimals = (req: Request, res: Response): void => {
    const animals = animalsService.getAllAnimals();
    res.json(animals);
};

// Funkcja pobierająca zwierzę po ID
const getAnimalById = (req: Request<{ id: string }>, res: Response): void => {
    const animal = animalsService.getAnimalById(req.params.id);
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).send('Animal not found');
    }
};

// Funkcja pobierająca zagrożone zwierzęta
const getEndangeredAnimals = (req: Request, res: Response): void => {
    const endangered = animalsService.getEndangeredAnimals();
    res.json(endangered);
};

// Funkcja pobierająca zwierzęta według siedliska
const getAnimalsByHabitat = (req: Request<{ habitat: string }>, res: Response): void => {
    const habitat = req.params.habitat;
    const animals = animalsService.getAnimalsByHabitat(habitat);
    res.json(animals);
};

// Funkcja pobierająca zwierzęta według gatunku
const getAnimalsBySpecies = (req: Request, res: Response): void => {
    const species = req.query.species as string;
    if (!species) {
        return res.status(400).send('Species query parameter is required');
    }
    const animals = animalsService.getAnimalsBySpecies(species);
    res.json(animals);
};

// Funkcja dodająca nowe zwierzę
const addAnimal = (req: Request<{}, {}, Animal>, res: Response): void => {
    const newAnimal: Animal = req.body;
    const addedAnimal = animalsService.addAnimal(newAnimal);
    res.status(201).json(addedAnimal);
};

// Funkcja aktualizująca dane zwierzęcia
const updateAnimal = (req: Request<{ id: string }, {}, Animal>, res: Response): void => {
    const updatedAnimal: Animal = req.body;
    const animal = animalsService.updateAnimal(req.params.id, updatedAnimal);
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).send('Animal not found');
    }
};

// Funkcja usuwająca zwierzę
const deleteAnimal = (req: Request<{ id: string }>, res: Response): void => {
    const success = animalsService.deleteAnimal(req.params.id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send('Animal not found');
    }
};

export default {
    getAllAnimals,
    getAnimalById,
    getEndangeredAnimals,
    getAnimalsByHabitat,
    getAnimalsBySpecies,
    addAnimal,
    updateAnimal,
    deleteAnimal
};

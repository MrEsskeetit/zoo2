import { Request, Response } from 'express';
import animalsService from '../services/animalsService';

const getAllAnimals = (req: Request, res: Response): void => {
    const animals = animalsService.getAllAnimals();
    res.json(animals);
};

const getAnimalById = (req: Request, res: Response): void => {
    const animal = animalsService.getAnimalById(req.params.id);
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).send('Animal not found');
    }
};

const getEndangeredAnimals = (req: Request, res: Response): void => {
    const endangered = animalsService.getEndangeredAnimals();
    res.json(endangered);
};

const getAnimalsByHabitat = (req: Request, res: Response): void => {
    const habitat = req.params.habitat;
    const animals = animalsService.getAnimalsByHabitat(habitat);
    res.json(animals);
};

const getAnimalsBySpecies = (req: Request, res: Response): void => {
    const species = req.query.species as string;
    if (!species) {
        return res.status(400).send('Species query parameter is required');
    }
    const animals = animalsService.getAnimalsBySpecies(species);
    res.json(animals);
};

const addAnimal = (req: Request, res: Response): void => {
    const newAnimal = req.body;
    const addedAnimal = animalsService.addAnimal(newAnimal);
    res.status(201).json(addedAnimal);
};

const updateAnimal = (req: Request, res: Response): void => {
    const updatedAnimal = req.body;
    const animal = animalsService.updateAnimal(req.params.id, updatedAnimal);
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).send('Animal not found');
    }
};

const deleteAnimal = (req: Request, res: Response): void => {
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
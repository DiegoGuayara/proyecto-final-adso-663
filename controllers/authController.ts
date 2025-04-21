import { Request, Response } from 'express';
import { PersonaRepository } from '../repositories/PersonaRepository';
import { AuthDto } from '../Dto/AuthDto';
import { PersonaDto } from '../Dto/personaDto';
import jwt from 'jsonwebtoken';

const personaRepository = new PersonaRepository();

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const authDto = new AuthDto(email, password);
            
            const persona = await personaRepository.findByEmail(authDto.email);
            if (!persona) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isValidPassword = await personaRepository.verifyPassword(authDto.email, authDto.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: persona.id_persona, email: persona.email },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error during login' });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const personaData = req.body;
            const existingPersona = await personaRepository.findByEmail(personaData.email);
            
            if (existingPersona) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const persona = new PersonaDto(
                personaData.tipo_persona,
                personaData.nombre,
                personaData.tipo_documento,
                personaData.num_documento,
                personaData.direccion,
                personaData.telefono,
                personaData.email,
                personaData.password
            );

            const newPersona = await personaRepository.create(persona);
            res.status(201).json(newPersona);
        } catch (error) {
            res.status(500).json({ message: 'Error during registration' });
        }
    }
}
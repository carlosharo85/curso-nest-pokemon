import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';



@Injectable()
export class SeedService {
    

    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter
    ) {}


    async executeSeed() {
        //limpia previamente la base de datos
        await this.pokemonModel.deleteMany({});


        const numToInsert = 650;
        const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${numToInsert}`);


        const pokemonToInsert: { name: string, no: number }[] = [];


        data.results.forEach(async ({ name, url }) => {
            const segments = url.split('/');
            const no: number = +segments[ segments.length - 2];

            pokemonToInsert.push({ name, no });
        });


        await this.pokemonModel.insertMany(pokemonToInsert);
        

        return `Seed executed`;
    }
}

import { Trainer } from '@prisma/client';
import { CreateTrainerDTO, TrainerDTO, UpdateTrainerDTO } from '../dto/TrainerDTO';
import PokemonApiService from '../services/PokemonApiService';

export interface TrainerCreationEntity {
  nick: string
  city: string
  phone: string
  pokemons: string
}

export type TrainerUpdateEntity = Partial<TrainerCreationEntity>

function transformPokemonsToString(pokemons?: string[]): string {
  const pokemonsSet = new Set(pokemons)
  return Array.from(pokemonsSet).join(',')
}

export function mapTrainerCreateDtoToEntity(trainer: CreateTrainerDTO): TrainerCreationEntity {
  return {
    ...trainer,
    pokemons: transformPokemonsToString(trainer.pokemons)
  }
}

export function mapTrainerUpdateDtoToEntity(trainer: UpdateTrainerDTO): TrainerUpdateEntity {
  return {
    ...trainer,
    pokemons: transformPokemonsToString(trainer.pokemons)
  }
}

export async function mapTrainerEntityToDto(trainer: Trainer): Promise<TrainerDTO> {
  const pokemonService = new PokemonApiService()
  const pokemons = trainer.pokemons ? trainer.pokemons.split(',') : []
  const pokemonsFromService = await Promise.all(
    pokemons.map(async pokemonId => pokemonService.getById(parseInt(pokemonId)))
  )
  return {
    ...trainer,
    pokemons: pokemonsFromService
  }
}
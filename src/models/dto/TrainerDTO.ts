import { PokemonDTO } from "./PokemonDTO"

export interface BaseTrainerDTO {
  id?: number
  nick: string
  city: string
  phone: string
}

export interface TrainerDTO extends BaseTrainerDTO {
  id: number
  pokemons: (PokemonDTO | undefined)[]
  userId: number | null
}

export interface CreateTrainerDTO extends BaseTrainerDTO {
  pokemons: string[]
}

export type UpdateTrainerDTO = Partial<CreateTrainerDTO>
import axios from 'axios'
import { PokemonDTO } from '../dto/PokemonDTO'

const baseUrl = 'https://pokeapi.co/api/v2/'

export default class PokemonApiService {
  async getById(id: number): Promise<PokemonDTO | undefined> {
    try {
      const response = await axios.get(`${baseUrl}/pokemon/${id}`)
      const { name, sprites, types } = response.data
      const pokemonDto: PokemonDTO = {
        id,
        name,
        type: types.map((item: any) => item.type.name).join(', '),
        sprite: sprites.front_default
      }
      return pokemonDto
    } catch {
      console.log('Pokemon Service not available')
      return
    }
  }
}
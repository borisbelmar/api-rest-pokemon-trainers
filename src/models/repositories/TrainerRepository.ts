import { PrismaClient } from "@prisma/client";
import { CreateTrainerDTO, UpdateTrainerDTO, TrainerDTO } from "../dto/TrainerDTO";
import { mapTrainerCreateDtoToEntity, mapTrainerEntityToDto, mapTrainerUpdateDtoToEntity } from "../mappers/trainerMappers";

const prisma = new PrismaClient()

export default class TrainerRepository {
  private userId: number

  constructor (userId: number) {
    this.userId = userId
  }
  
  public readonly findAll = async (): Promise<TrainerDTO[]> => {
    const trainers = await prisma.trainer.findMany({
      where: {
        userId: this.userId
      }
    })
    const transformedTrainers = await Promise.all(
      trainers.map(async trainer => {
        return mapTrainerEntityToDto(trainer)
      })
    )
    return transformedTrainers
  }
  
  public readonly findById = async (id: number): Promise<TrainerDTO | undefined> => {
    const trainer = await prisma.trainer.findFirst({
      where: {
        id,
        userId: this.userId
      }
    })

    if (!trainer) return

    const transformedTrainer = await mapTrainerEntityToDto(trainer)
    
    return transformedTrainer
  }

  public readonly create = async (trainer: CreateTrainerDTO): Promise<TrainerDTO> => {
    const trainerEntity = mapTrainerCreateDtoToEntity(trainer)
    const newTrainer = await prisma.trainer.create({
      data: { ...trainerEntity, userId: this.userId }
    })
    
    const transformedNewTrainer = await mapTrainerEntityToDto(newTrainer)

    return transformedNewTrainer
  }

  public readonly update = async (id: number, trainer: UpdateTrainerDTO): Promise<void> => {
    await prisma.trainer.updateMany({
      where: {
        id
      },
      data: mapTrainerUpdateDtoToEntity(trainer)
    })
  }

  public readonly delete = async (id: number): Promise<void> => {
    await prisma.trainer.deleteMany({
      where: {
        id
      }
    })
  }
}
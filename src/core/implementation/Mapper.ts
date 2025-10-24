import { Either } from '../errors/either/Either'

export interface Mapper<E, M> {
    toPersistence(entity: E): Either<M>
    toDomain(raw: M): Either<E>
}

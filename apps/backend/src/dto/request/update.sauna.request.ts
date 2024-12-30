
export class UpdateSaunaRequest {
  id!: number;
  name!: string;
  saunaType!: string;
  humidity!: number;
  temperature!: number;
  peopleCapacity!: number;
  reservations!: number[];
}


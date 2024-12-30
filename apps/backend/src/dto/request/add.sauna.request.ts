export class AddSaunaRequest {
  name!: string;
  saunaType!: string;
  humidity!: number;
  temperature!: number;
  peopleCapacity!: number;
  reservations!: number[];
}


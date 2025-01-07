export interface CreateKidBody {
  firstName: string;
  lastName: string;
  age: number;
}

export interface UpdateKidBody {
  firstName?: string;
  lastName?: string;
  age?: number;
}

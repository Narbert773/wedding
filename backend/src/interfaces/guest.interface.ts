export interface CreateGuestBody {
  firstName: string;
  lastName: string;
}

export interface UpdateGuestBody {
  firstName?: string;
  lastName?: string;
}

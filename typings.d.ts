type AuthStore = {
  user: User;
  setuserAuth: (u: User) => void;
  setisloggedinTrue: () => void;
  setisloggedinFalse: () => void;
};

type User = {
  id: string;
  name: string;
  email: string;
  isloggedin: boolean | null;
};
//EMailResponse
type EmailResponseList = EmailResponse[];

type EmailResponse = {
  subject: string;
  responses: UserResponse[];
  emailId: string;
  text: string;
};

type UserResponse = {
  userEmail: string;
  response: string;
};

//Email Provider Zustand

type UserEmailProvider = {
  responses: UserResponse[];
  setResponses: (r: UserResponse[]) => void;
};

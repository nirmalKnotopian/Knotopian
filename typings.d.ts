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
  isloggedin: boolean | null | undefined;
};
//EMailResponse
type EmailResponseList = EmailResponse[];

type EmailResponse = {
  subject: string;
  responses: UserResponse[];
  modifiedResponses: string[];
  emailId: string;
  text: string;
  id: string;
};

type UserResponse = {
  userEmail: string;
  response: {
    [key: string]: string;
  };
};

//Email Provider Zustand

type UserEmailProvider = {
  responses: UserResponse[];
  setResponses: (r: UserResponse[]) => void;
};

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
  id: string;
};

type UserResponse = {
  userEmail: string;
  response: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
  };
};

//Email Provider Zustand

type UserEmailProvider = {
  responses: UserResponse[];
  setResponses: (r: UserResponse[]) => void;
};

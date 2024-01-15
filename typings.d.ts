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

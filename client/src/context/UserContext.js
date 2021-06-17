import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  user: {
    _id: "60c714754542590e58572c50",
    profilePicture: "",
    coverPicture: "",
    speculatings: [],
    followings: ["60c7146d4542590e58572c4f"],
    followers: [],
    productivityPoints: 0,
    rank: 9999,
    totalAmtWon: 0,
    totalAmtLost: 0,
    betFor: [],
    betAgainst: [],
    buddyHistory: [],
    goalHistory: [],
    isAdmin: false,
    email: "john@gmail.com",
    username: "john",
    salt: "4afcdaf70ab28eb65c2199bdf30abb92336a874ab01a3ef2370688a7fee34d07",
    hash: "4fca0d6ed7ba13d3f6d4cbc47313a85dea1fb5f1a65b002aaf1e424ee7dfa977d4898b83aa3197b480dc799eb0c22de7e578c747263e3fd52e72e477ec42af20a95f2bf59f8d17fceec7d286865ee7e8a78e2e9d00f34d267930c9b6ccb318a6709a378a2da6c1429618dc38fd0cbeada4d31ab4ad3f14e7d39d20f8d8366120aabd80abe99926c847938d348773806f589046b72bd06ad4de913f8fe8820592fa7441c2498ca408081feae75c822d48ce5948c6f26a5f46d455ee0ffe2c3cfbfc2efe0f121d073c85ea61cd07771f7da64e7cb80add4bc75213eb3463fd182b9f35236c4aeb0660e81ac009d83e44657b76663fcbb8cd471a49c49757987cebed257b069cd49757d899b673de25fe928011f1094faf7cc0e595585109b77cc038c41ef5de2a39a896c88e7f4d99d72355919ab19c9b91c74db8486528bb49d6d2f9cd2b302bc1ab5ad7f400890b31df4c944c0bbe4c34e289461fe9efd72072cc653bf56743e21471c644618e901790d447f9ef56e91f13c2594cef01ff687c4ddb663efd6b556b0bbde8f464508ae83d306ef15854ef5e8f86320f61150b871f02d7b84cf8f93bdf37f0c1ac7a66135e8f56e8505746dc417e0313714244671cbdf38f2c907b7b654fab757f7b20b4a23247aa3dbcd8bccb96f3aeb1bc68a91099d7faed272b8884b6222f1727a2072fb5df97dea99078038e156665a2bb6f",
    createdAt: new Date(2021, 5, 14),
    updatedAt: new Date(2021, 5, 14),
    __v: 0,
  },
  isFetching: false,
  error: false,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

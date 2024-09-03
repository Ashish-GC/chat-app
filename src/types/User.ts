

export type userType ={
      id:string,
      username: string,
      email:string,
      profilePicture:string,
      description:string,
      friends:any,
      lastLogin:Date
}

export type userContextType = {
    user:userType,
    setUser:React.Dispatch<React.SetStateAction<userType>>,
}
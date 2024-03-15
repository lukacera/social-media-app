import React, { useEffect, useState } from "react"
import { userType } from "../../../server/types/userType";
import { getUser } from "../api/getUserApi";

const ViewProfile: React.FC<{ username: string }> = ({ username }) => {

  // Initialize loading state, set to false later on when program is done
  // with fetching
  const [loading, setLoading] = useState<boolean>(true)

  // Initialize state before fetching
  const [userData, setUserData] = useState<Partial<userType>>({
    age: 0,
    name: "",
    surname: "",
    username: "",
    avatar: "",
    friends: [],
    posts: []
  })

  // Fetch data from REST API on every change of username
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetched_data = await getUser(username);
        if (fetched_data) {
          setUserData(() => ({
            age: fetched_data.age,
            name: fetched_data.name,
            surname: fetched_data.surname,
            avatar: fetched_data.avatar,
            username: fetched_data.username,
            friends: fetched_data.friends,
            posts: fetched_data.posts
          }));
        } else {
          throw new Error("User not found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      // Set loading to false, which means that fetching is done
      setLoading(false);
    };
    fetchData();
  }, [username]);
  return (

    <div className="h-full grid justify-center">
      {userData.username && (
        <div className="flex flex-col gap-16 text-xl mt-16">
          <div className="flex flex-col place-items-center gap-10 
            w-[70%] mx-auto">
            <img className="w-[15rem]" src={userData.avatar} alt="User picture" />
            <h2 className="text-[2.4rem] font-bold">{userData.username}</h2>
          </div>
          <div className="flex flex-col items-center gap-10">
            <h3 className="font-merryweather text-3xl">Bio</h3>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <p className="flex items-center gap-1">
                  <span>Name:</span>
                  <span>{userData.name}</span>
                </p>
                <p className="flex items-center gap-1">
                  <span>Surname:</span>
                  <span>{userData.surname}</span>
                </p>
              </div>
              <p className="flex justify-center gap-2">
                <span>Age:</span>
                <span>{userData.age}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-5">
            <p className="flex justify-center gap-2">
              <span>Friends:</span>
              <span>{userData.friends?.length}</span>
            </p>
            <p className="flex justify-center gap-2">
              <span>Posts:</span>
              <span>{userData.posts?.length}</span>
            </p>
          </div>
        </div>
      )}
      {!loading && userData.username?.length === 0 && (
        <p className="flex items-center text-[3rem] tracking-wider">Page not found!</p>
      )}
    </div>
  )
};

export default ViewProfile;

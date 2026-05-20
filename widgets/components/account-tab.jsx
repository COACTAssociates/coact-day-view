import React from "react";
import { useQuery } from "@tanstack/react-query";

const useGetRandomUsers = (app) => {
  return useQuery({
    queryKey: ["random-users"],
    queryFn: async () => {
      const resp = await app.data.invoke("getRandomUsers");
      return resp?.response;
    },
  });
};

export const AccountsTab = ({ app }) => {
  const { data, isLoading, isError } = useGetRandomUsers(app);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Random Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {data?.map((user, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 border">
            <div className="flex items-center space-x-4">
              <img
                src={user.picture.medium}
                alt={`${user.name.first} ${user.name.last}`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {user.name.first} {user.name.last}
                </h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500 text-sm">
                  {user.location.city}, {user.location.country}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

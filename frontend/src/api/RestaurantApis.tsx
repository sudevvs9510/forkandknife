// export const Register = async (credentials: credentials): Promise<{ user: {email: string, _id: string}; message: string | null }> => {
//    try {
//       const response = await authAxios.post('/signup', credentials);
//       const { user, message } = response.data;
//       return { user, message };
//    } catch (error) {
//       console.log("Error in register", error)
//       throw new Error()
//    }
// }
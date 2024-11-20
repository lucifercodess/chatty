import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.users });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      console.log("Fetched messages:", res.data);  // Add logging here
      set({ messages: res.data || [] });  // Make sure messages is an array
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    if (!Array.isArray(messages)) {
      console.error("Messages is not an array, initializing as an empty array");
      set({ messages: [] });
    }
    if (!selectedUser) {
      console.error("No selected user");
      toast.error("Please select a user to send the message.");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      console.log("Message sent, response:", res);

      if (res && res.data) {
        set((state) => {
          const updatedMessages = Array.isArray(state.messages)
            ? [...state.messages, res.data]
            : [res.data];
          toast.success("Message sent successfully.");
          return { messages: updatedMessages };
        });
      } else {
        throw new Error("No data in response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

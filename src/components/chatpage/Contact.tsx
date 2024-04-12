import { useAuth } from "@/context/AuthProvider";
import * as apiClient from "@/react-query/query-api";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation } from "react-query";
import Loader from "../shared/Loader";

type ContactType = {
  username: string;
  profileImage: string;
};

const Contacts = () => {
  const [search, setSearch] = useState("");
  const { currentUser } = useAuth();

  const { ref, inView } = useInView();
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [currentFriendPagination, setCurrentFriendPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [contacts, setContacts] = useState<any[]>([]);

  const mutation = useMutation(apiClient.getCurrentFriend, {
    onSuccess: async (data: any) => {
      if (data && data.length > 0) {
        setCurrentFriendPagination({
          pageSize: currentFriendPagination.pageSize,
          pageIndex: currentFriendPagination.pageIndex + 1,
        });
        setContacts((prev) => [...prev, ...data]);
      } else {
        if (
          !data ||
          data.length === 0 ||
          data.length < currentFriendPagination.pageSize
        )
          setShowLoadMore(false);
      }
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });
  const handleGetData = (pagination: any) => {
    mutation.mutate(pagination);
  };
  useEffect(() => {
    if (inView) {
      handleGetData(currentFriendPagination);
    }
  }, [inView, currentFriendPagination]);

  /* SELECT CONTACT */
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const isGroup = selectedContacts.length > 1;

  const handleSelect = (contact: any) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((item) => item !== contact)
      );
    } else {
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contact,
      ]);
    }
  };

  /* ADD GROUP CHAT NAME */
  const [name, setName] = useState("");

  return (
    <div className="create-chat-container">
      <input
        placeholder="Tìm kiếm liên lạc..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="contact-bar mt-10">
        <div className="contact-list">
          <p className="text-body-bold">Chọn người liên lạc</p>

          <div className="flex flex-col flex-1 gap-5 overflow-y-scroll ">
            {contacts.map((user, index) => (
              <div
                key={index}
                className="contact"
                onClick={() => handleSelect(user)}
              >
                {selectedContacts.find((item) => item === user) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                )}
                <img
                  src={user.avatar || "/person.jpg"}
                  alt="profile"
                  className="profilePhoto"
                />
                <p className="text-base-bold">
                  {user.lastName} {user.firstName}
                </p>
              </div>
            ))}
            {showLoadMore && (
              <div ref={ref}>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="create-chat">
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Tên nhóm </p>
                <input
                  placeholder="Enter group chat name..."
                  className="input-group-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Members</p>
                <div className="flex flex-wrap gap-3">
                  {selectedContacts.map((contact, index) => (
                    <p className="selected-contact" key={index}>
                      {contact.firstName} {contact.lastName}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
          <button
            className="btn btn-primary"
            // onClick={createChat}
            disabled={selectedContacts.length === 0}
          >
            Bắt đầu cuộc trò chuyện mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

import { useEffect, useState } from "react";

type ContactType = {
  username: string;
  profileImage: string;
};

const contacts = [
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    username: "Thanh Thuan",
    profileImage:
      "https://images.pexels.com/photos/17840523/pexels-photo-17840523/free-photo-of-nha-ngoi-nha-can-nha-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
];
const Contacts = () => {
  //const [loading, setLoading] = useState(true);
  //const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  //const currentUser = session?.user;

  // const getContacts = async () => {
  //   try {
  //     const res = await fetch(
  //       search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
  //     );
  //     const data = await res.json();
  //     setContacts(data.filter((contact) => contact._id !== currentUser._id));
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser) getContacts();
  // }, [currentUser, search]);

  /* SELECT CONTACT */
  const [selectedContacts, setSelectedContacts] = useState<ContactType[]>([]);
  const isGroup = selectedContacts.length > 1;

  const handleSelect = (contact: ContactType) => {
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

  /* CREATE CHAT */
  // const createChat = async () => {
  //   const res = await fetch("/api/chats", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       currentUserId: currentUser._id,
  //       members: selectedContacts.map((contact) => contact.id),
  //       isGroup,
  //       name,
  //     }),
  //   });
  //   const chat = await res.json();

  //   if (res.ok) {
  //     router.push(`/chats/${chat._id}`);
  //   }
  // };

  return (
    <div className="create-chat-container">
      <input
        placeholder="Tìm kiếm liên lạc..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="contact-bar">
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
                  src={user.profileImage}
                  alt="profile"
                  className="profilePhoto"
                />
                <p className="text-base-bold">{user.username}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="create-chat">
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Group Chat Name</p>
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
                      {contact.username}
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

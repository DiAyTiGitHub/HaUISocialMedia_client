import avatar from "@/assets/avatar.png";

const FriendResquest = () => {
  return (
    <div className="mt-4">
      <h3 className="h3-bold text-gray my-1">Lời mời kết bạn</h3>
      <div className="bg-white p-4 rounded-xl mb-3">
        <div className="flex gap-4 mb-4">
          <div className="profile-photo">
            <img src={avatar} alt="profile-photo" />
          </div>
          <div>
            <h5>Hajia Bintu</h5>
            <p className="text-gray font-medium">8 mutual friends</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-primary">Chấp nhận</button>
          <button className="btn">Từ chối</button>
        </div>
      </div>
    </div>
  );
};

export default FriendResquest;

const members = [];

// 채팅방에 인원을 추가한다.
const addUser = ({ id, user, study }) => {
  // 스터디 인원 중에 현재 사용자가 있는지 찾는다.
  const existingUser = members.find(
    (member) => member.user === user && member.study === study
  );

  // 없다면 에러 메세지를 보낸다.
  if (existingUser) {
    return { error: true };
  }

  const member = { id, user, study };

  members.push(member);

  // 채팅방에 새로 들어온 사용자를 반환한다.
  return { member };
};

// 채팅방에 인원을 제거한다.
const removeUser = (id) => {
  // 채팅방에 가져온 socket id를 기준으로 채팅방 사용자를 찾는다.

  const idx = members.findIndex((member) => member.id === id);

  // 동일한 socket id를 가진 사용자를 찾으면 users 배열에 값을 삭제한다.
  if (idx !== -1) {
    members.splice(idx, 1)[0];
  }
};

// 채팅방에 socket id를 가진 사용자를 반환한다.
const getUser = (id) => members.find((member) => member.id === id);

// 채팅방에 존재하는 모든 사용자를 찾아 반환한다.
const getUserInRoom = (room) =>
  members.filter((member) => member.study === room);

module.exports = { addUser, getUser, removeUser, getUserInRoom };

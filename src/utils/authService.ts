
import { getUsers, saveUsers } from './authStorage';



// 가입-------------------------
export function signup(inputId, inputPassword) {
  

  const users = getUsers();
  const exists = users.find(user => user.userId === inputId);

  if (exists) {
    return {
      success: false,
      message: '이미 존재하는 아이디입니다',
    };
  }

  const newUser = { userId: inputId, password: inputPassword };
  saveUsers([...users, newUser]);

  return {
    success: true,
  };
}


// 로그인-------------------------------------


type LoginResult = {
  success: boolean;
  role: string;
  message?: string;
};


export function login(inputId: string, inputPassword: string): LoginResult {


  if (inputId === 'admin' && inputPassword === 'admin1234!') {
    setLoginUser('admin');
    return { success: true, role: 'ADMIN', message: "관리자님 환영합니다." };
  }
  
  const users = getUsers();
  const user = users.find((u) => u.userId === inputId);

  if (!user) {
    return { success: false, message: "없는 아이디입니다" };
  }

  if (user.password !== inputPassword) {
    return { success: false, message: "비밀번호가 틀렸습니다" };
  }

  setLoginUser(inputId);

  return { 
    success: true, 
    role: 'USER' 
  };
}








// 로그인 사용자 저장
export function setLoginUser(userId: string) {
  localStorage.setItem('loginUser', userId);
}

// 로그아웃
export function logout() {
  localStorage.removeItem('loginUser');
}



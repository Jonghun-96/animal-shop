import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1️⃣ 찜할 상품의 데이터 타입 정의
export interface WishItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

// 2️⃣ 로컬스토리지에서 기존 찜 목록 불러오기
const loadWishlist = (): WishItem[] => {
  try {
    const savedData = localStorage.getItem("wishlist");
    return savedData ? JSON.parse(savedData) : [];
  } catch (error) {
    console.error("찜 목록을 불러오는 중 에러 발생:", error);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlist(), // 초기값을 로컬스토리지 데이터로 설정
  reducers: {
    // 3️⃣ 찜 토글 (없으면 추가, 있으면 삭제)
    toggleWish: (state, action: PayloadAction<WishItem>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);

      if (index >= 0) {
        // 이미 있으면 삭제
        state.splice(index, 1);
        // alert("찜 목록에서 삭제되었습니다."); // 선택 사항
      } else {
        // 없으면 추가
        state.push(action.payload);
        // alert("찜 목록에 추가되었습니다!"); // 선택 사항
      }

      // 4️⃣ 변경된 상태를 로컬스토리지에 즉시 저장
      localStorage.setItem("wishlist", JSON.stringify(state));
    },

    // 5️⃣ 명시적으로 특정 아이템 삭제 (X 버튼 등)
    removeWish: (state, action: PayloadAction<number>) => {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(newState));
      return newState;
    },

    // 6️⃣ 찜 목록 전체 비우기
    clearWishlist: () => {
      localStorage.removeItem("wishlist");
      return [];
    },
  },
});

export const { toggleWish, removeWish, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
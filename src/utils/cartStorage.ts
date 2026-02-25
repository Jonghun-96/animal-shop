



const getCartKey = (userId?: string | number | { id: string | number }) => {
  const finalId = typeof userId === 'object' ? userId?.id : userId;
  return finalId ? `cart_${finalId}` : "cart_guest";
};



export function getCart(userId?: string) {
  try {
    const key = getCartKey(userId);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.log('장바구니 불러오기 실패', err);
    return [];
  }
}



export function saveCart(cart, userId?: string) {
  try {
    const key = getCartKey(userId);
    localStorage.setItem(key, JSON.stringify(cart));
  } catch (err) {
    console.log('장바구니 저장 실패', err);
  }
}


export function clearCartStorage(userId?: string){
  const key = getCartKey(userId);
  localStorage.removeItem(key);
}


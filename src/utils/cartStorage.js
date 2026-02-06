


const CART_KEY = 'cart';


export function getCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.log('장바구니 불러오기 실패', err);
    return [];
  }
}



export function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.log('장바구니 저장 실패', err);
  }
}


export function clearCartStorage(){
  localStorage.removeItem(CART_KEY);
}


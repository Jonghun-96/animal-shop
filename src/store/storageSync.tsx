import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { saveCart } from '../utils/cartStorage';
import { saveLikes } from '../utils/likesStorage';
import { getLoginUser } from '../utils/authStorage';


function StorageSync() {
  const cart = useSelector(state => state.cart);
  const likes = useSelector(state => state.likes);

  useEffect(()=>{
    const userId = getLoginUser();
    saveCart(cart, userId);
    saveLikes(likes, userId);
  },[cart, likes]);

  return null;

}


export default StorageSync;
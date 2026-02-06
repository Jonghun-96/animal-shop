import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { saveCart } from '../utils/cartStorage';
import { saveLikes } from '../utils/likesStorage';


function StorageSync() {
  const cart = useSelector(state => state.cart);
  const likes = useSelector(state => state.likes);

  useEffect(()=>{
    saveCart(cart);
  },[cart]);

  useEffect(()=>{
    saveLikes(likes);
  },[likes]);


  return null;

}


export default StorageSync;
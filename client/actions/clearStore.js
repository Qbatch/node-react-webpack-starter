import { clearUserAction } from './userActions';
import { clearProductsAction } from './productActions';

export function signOutAction() {
  console.log('signOutAction');
  return clearUserAction();
}

export function signOutAction() {
  console.log('Yes');
  return clearUserAction() && clearProductsAction();
}

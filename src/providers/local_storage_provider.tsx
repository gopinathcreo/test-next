import { cookies } from 'next/headers'
import {CartProvider, useCart} from "@/src/providers/cart_context";


export class LocalStorageProvider {

    static setCheckout(token: any) {
        localStorage.setItem("checkout_token", token,);
    }

    static getCheckout() {
        return localStorage.getItem("checkout_token");
    }

    static deleteCheckout() {
        localStorage.removeItem("checkout_token");
    }

    static isLoggedIn() {
        return localStorage.getItem("zoozle_ecom_token") !== null;
    }

    static setToken(token: any) {
        localStorage.setItem("zoozle_ecom_token", token);
    }

    static getToken() {
        return localStorage.getItem("zoozle_ecom_token");
    }

    static deleteToken() {
        localStorage.removeItem("zoozle_ecom_token");
    }

    static setUserMobile(mobile: string) {
        localStorage.setItem("user_mobile", mobile);
    }

    static getUserMobile() {
        return localStorage.getItem("user_mobile");
    }

    static deleteUserMobile() {
        localStorage.removeItem("user_mobile");
    }
}
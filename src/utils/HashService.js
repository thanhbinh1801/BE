import { sha256 } from "js-sha256";

export default class HashService{
  static hashPW(pw) {
    const hash = sha256(pw);
    return hash;
  }
  static verifyPW(pw, hash) {
    const hashPW = sha256(pw);
    return hashPW === hash;
  }
}
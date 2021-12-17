export function setCookie(name){
  document.cookie = `user=${name}; path=/; max-age=300`
}
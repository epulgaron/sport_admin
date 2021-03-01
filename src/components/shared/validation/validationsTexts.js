export const EMAIL_VALID = "El correo electrónico no es válido"
export const EMAIL_REQUIRED = "El correo electrónico es requerido"
export const EMAIL_EXISTS = "Ese correo electrónico ya está registrado. Intente con otro"

export const USERNAME_REQUIRED = "El nombre de usuario es requerido"
export const USERNAME_EXISTS = "Ese nombre de usuario ya está registrado"

export const PASSWORD_LENGTH = (maxLength) => "La contraseña debe tener al menos " + maxLength + ' caracteres'
export const PASSWORD_REQUIRED = "La contraseña no puede estar vacía"
export const PASSWORDS_EQUALS = "Las contraseñas no coinciden"

export const VALUE_REQUIRED = "Este campo es requerido"
export const VALUE_INTEGER = "Este campo debe ser un número "
export const MAX_LENGTH = (maxLength) => "Este campo no puede tener más de " + maxLength + ' caracteres'
export const MIN_LENGTH = (minLength) => "Este campo no puede tener menos de " + minLength + ' caracteres'
export const LENGTH = (length) => "Este campo debe tener " + length + " caracteres"
export const SAME_AS = (campo) => "Este campo debe coincidir con el campo " + campo + " "


export const TextMap = {
  required: VALUE_REQUIRED,
  integer: VALUE_INTEGER
}

export const getTextValidation = (param) => {
  const {
    type
  } = param
  if (type == 'maxLength') {
    return MAX_LENGTH(param.max)
  } else if (type == 'maxLength') {
    return MIN_LENGTH(param.min)
  } else if (type == 'email') {
    return EMAIL_VALID
  }else if (type == 'sameAs') {
    return SAME_AS(param.eq)
  }
  return TextMap[type]
}

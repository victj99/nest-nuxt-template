export const email = [
  (v: any) => !!v || 'E-mail es requerido',
  (v: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'E-mail debe ser valido'
]

export const onlyEmail = [
  (v: string) => !v || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'E-mail debe ser valido'
]

export const textfield = [
  (v: any) => !!v || 'Este campo es requerido',
  (v: string) => /^[a-zA-ZÀ-ÿ0-9 ]+$/.test(v) || 'Solo letras y números'
]

export const textfield2 = [
  (v: any) => !!v || 'Este campo es requerido',
  (v: string) => /^[a-zA-ZÀ-ÿ0-9 ,.]+$/.test(v) || 'Solo letras y números'
]

export const address = [
  (v: any) => !!v || 'Este campo es requerido',
  (v: string) => /^[a-zA-ZÀ-ÿ0-9 ,.;\-+!”#$%&/()=?¡¿*°]+$/.test(v) || 'Hay caracteres no permitidos'
]

export const textArea = [
  (v: any) => !!v || 'Este campo es requerido',
  (v: string) => /^[a-zA-ZÀ-ÿ0-9\r\n  -:]+$/.test(v) || 'Solo letras y números'
]

export const numbers = [
  (v: any) => !!v || 'Este campo es requerido',
  (v: string) => /^[0-9]+$/.test(v) || 'Solo se permiten números'
]

export const alphanumeric = [
  (v: string) => !v || /^[a-zA-ZÀ-ÿ0-9 ]+$/.test(v) || 'Solo letras y números'
]

export const packingSize = [
  (v: string) => !v || /^[0-9a-zA-Z- ]+$/.test(v) || 'Solo letras y números'
]
export const weight = [
  (v: string) => !v || /^[0-9,. KGSMT]+$/.test(v) || 'No es un peso válido'
]
export const price = [
  (v: string) => !v || /^[0-9,.]+$/.test(v) || 'No es un número válido'
]

export const noEmptyField = [
  (v: any) => !!v || 'Este campo es requerido'
]
export const noEmpty = [
  (v: string | any[]) => (v && v.length >= 6) || 'Este campo debe tener al menos 6 caracteres'
]

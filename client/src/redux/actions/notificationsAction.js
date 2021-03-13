export const INFO = 'INFO'
export const SUCCESS = 'SUCCESS'
export const WARNING = 'WARNING'
export const ERROR = 'ERROR'

export const infoNF = (data) => {
	return {
		type: INFO,
		data: data,
	}
}
export const successNF = (data) => {
	return {
		type: SUCCESS,
		data: data,
	}
}
export const warningNF = (data) => {
	return {
		type: WARNING,
		data: data,
	}
}
export const errorNF = (data) => {
	return {
		type: ERROR,
		data: data,
	}
}
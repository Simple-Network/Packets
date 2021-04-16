import { WriteMethod, WriteMethods } from './Methods'

type ValidTypes = 'null' | 'byte' | 'short' | 'int' | 'long' | 'float' | 'double' | 'boolean' | 'string' | 'array' | 'object'

const getType = (value: any): ValidTypes => {
	if (value == null) return 'null'
	if (value instanceof Array) return 'array'

	switch (typeof value) {
		case 'number': return Number.isInteger(value) ? 'int' : 'double'
		case 'bigint': return 'long'
		case 'undefined': return 'null'
		case 'boolean': return 'boolean'
		case 'object': return 'object'
	}
	return 'object'
}

const TypeIds: { [key in ValidTypes]: number } = { 'null': 0, byte: 1, short: 2, int: 3, long: 4, float: 5, double: 6, boolean: 7, string: 8, array: 9, object: 10 }

const IdsToMethods: { [key: number]: { write: (methods: WriteMethods) => WriteMethod<any> } } = {
	0: { write: (methods) => methods.writeNull },
	1: { write: (methods) => methods.writeByte },
	2: { write: (methods) => methods.writeShort },
	3: { write: (methods) => methods.writeInt },
	4: { write: (methods) => methods.writeLong },
	5: { write: (methods) => methods.writeFloat },
	6: { write: (methods) => methods.writeDouble },
	7: { write: (methods) => methods.writeBoolean },
	8: { write: (methods) => methods.writeString },
	9: { write: (methods) => methods.writeArray },
	10: { write: (methods) => methods.writeObject }
}

export {
	ValidTypes,
	getType,
	TypeIds,
	IdsToMethods
}
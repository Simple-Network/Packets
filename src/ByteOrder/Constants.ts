import { ReadMethod, ReadMethods, WriteMethod, WriteMethods } from './Methods'

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

const IdsToMethods: { [key: number]: { write: (methods: WriteMethods) => WriteMethod<any>, read: (methods: ReadMethods) => ReadMethod<any> } } = {
	0: { write: (methods) => methods.writeNull, read: (methods) => methods.readNull },
	1: { write: (methods) => methods.writeByte, read: (methods) => methods.readByte },
	2: { write: (methods) => methods.writeShort, read: (methods) => methods.readShort },
	3: { write: (methods) => methods.writeInt, read: (methods) => methods.readInt },
	4: { write: (methods) => methods.writeLong, read: (methods) => methods.readLong },
	5: { write: (methods) => methods.writeFloat, read: (methods) => methods.readFloat },
	6: { write: (methods) => methods.writeDouble, read: (methods) => methods.readDouble },
	7: { write: (methods) => methods.writeBoolean, read: (methods) => methods.readBoolean },
	8: { write: (methods) => methods.writeString, read: (methods) => methods.readString },
	9: { write: (methods) => methods.writeArray, read: (methods) => methods.readArray },
	10: { write: (methods) => methods.writeObject, read: (methods) => methods.readObject }
}

export {
	ValidTypes,
	getType,
	TypeIds,
	IdsToMethods
}